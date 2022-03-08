"use strict";

const { createDocuments, readDocuments, updateDocument, deleteDocuments } = require( "../helpers/crud" );
const { requestGuard, response } = require( "../helpers/utils" );
const { StripePayment } = require( "../modules/payment" );

const postMethod = async requestParams => {
	try {
		await createDocuments( requestParams );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const getMethod = async requestParams => {
	try {
		const data = await readDocuments( requestParams );
		return response({
			httpCode: 200,
			data
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const putMethod = async requestParams => {
	try {
		await updateDocument( requestParams );

		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

const deleteMethod = async requestParams => {
	try {
		await deleteDocuments( requestParams );
		return response({ httpCode: 200 });
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};


exports.router = async event => {
	try {
		const requestParams = await requestGuard( event );
		const methods = {
			POST: () => postMethod( requestParams ),
			GET: () => getMethod( requestParams ),
			PUT: () => putMethod( requestParams ),
			DELETE: () => deleteMethod( requestParams )
		};
		return await methods[event.httpMethod]();
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

exports.updatePosition = async event => {
	try {
		const data = await readDocuments({ collection: "policies" });
		const documents = await JSON.parse( event.body );
		data.sort( ( pol1, pol2 ) => pol1.order - pol2.order );
		let oldIndex, newIndex;
		for ( let i = 0; i < data.length; i++ ) {
			if ( data[i]._id === documents.oldId ) oldIndex = i;
			if ( data[i]._id === documents.newId ) oldIndex = i;
		}

		if ( oldIndex > newIndex ) {
			for ( let i = newIndex; i < oldIndex; i++ ) {
				const currentOrder = data[i + 1].order;
				updateDocument({
					collection: "policies",
					_id: data[i]._id,
					documents: { order: currentOrder }
				});
			}
			updateDocument({
				collection: "policies",
				_id: data[oldIndex]._id,
				documents: { order: data[newIndex].order }
			});
		} else {
			updateDocument({
				collection: "policies",
				_id: data[oldIndex]._id,
				documents: { order: data[newIndex].order }
			});
			for ( let i = oldIndex + 1; i <= newIndex; i++ ) {
				const currentOrder = data[i - 1].order;
				updateDocument({
					collection: "policies",
					_id: data[i]._id,
					documents: { order: currentOrder }
				});
			}
		}
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};
const getProjectAmount = async ( businessId, today ) => {
	let totalBudget;
	totalBudget = 0;
	const projects = await readDocuments({
		collection: "jobs",
		query: {
			endsAt: {
				$gt: today,
				$lt: today + 86400000
			},
			business: businessId
		}
	});
	for ( let i = 0; i < projects.length; i++ ) {
		let paymentBudget;
		if ( projects[i].payment.type === "fixed" ) paymentBudget = projects[i].payment.budget;
		else if ( projects[i].payment.type === "hourly" ) paymentBudget = projects[i].payment.rate * projects[i].hours;
		if ( projects[i].payment_schedule === "fifty_fifty" ) totalBudget += paymentBudget / 2;
		else if ( projects[i].payment_schedule === "upon_complete" ) totalBudget += paymentBudget;
	}
	return totalBudget;
};
// eslint-disable-next-line
exports.financialReports = async event => {
	try {
		const document = await JSON.parse( event.body );
		let totalMonthPay, totalYearPay, totalPay, totalPayingOut;
		totalMonthPay = 0;
		totalPay = 0;
		totalYearPay = 0;
		totalPayingOut = 0;
		const stripePayment = new StripePayment();
		const today = new Date();
		const firstDay = new Date( today.getFullYear(), today.getMonth() - 1, 1 );
		const newDay = new Date( new Date().getFullYear(), 0, 1 );

		if ( document.financialType === "business" ) {
			const paymentlists = await stripePayment.getPayout( document.accountId );
			for ( let i = 0; i < paymentlists.data.length; i++ ) {
				const amountPaid = paymentlists.data[i].amount_received / 100;
				// eslint-disable-next-line max-depth
				if ( firstDay < paymentlists.data[i].created * 1000 ) totalMonthPay += amountPaid;
				// eslint-disable-next-line max-depth
				if ( newDay < paymentlists.data[i].created * 1000 ) totalYearPay += amountPaid;
				// eslint-disable-next-line max-depth
				totalPay += amountPaid;
			}

			const upcomingInvoice = await stripePayment.upcomingInvoice( document.accountId );
			if ( upcomingInvoice.data ) {
				const amountPaid = upcomingInvoice.data.amount_due / 100;
				// eslint-disable-next-line max-depth
				if ( today + 86400000 > upcomingInvoice.data.created ) totalPayingOut += amountPaid;
			}
			totalPayingOut += await getProjectAmount( document.accountId, today, true );
		} else {
			const contracts = await readDocuments({ collection: "contracts" });
			for ( let i = 0; i < contracts.length; i++ ) {
				// eslint-disable-next-line max-depth
				if ( contracts[i].endsAt < today && contracts[i].endsAt > firstDay ) totalMonthPay += contracts[i].paidAmount;
				// eslint-disable-next-line max-depth
				if ( contracts[i].endsAt > newDay ) totalYearPay += contracts[i].paidAmount;
				// eslint-disable-next-line max-depth
				totalYearPay += contracts[i].paidAmount;
				// eslint-disable-next-line max-depth
				if ( contracts[i].endsAt >= today && contracts[i].endsAt < today + 86400000 ) totalPayingOut += contracts[i].remainingAmount;
			}
		}
		return response({
			httpCode: 200,
			data: {
				totalMonthPay,
				totalPay,
				totalYearPay,
				totalPayingOut
			}
		});
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};

