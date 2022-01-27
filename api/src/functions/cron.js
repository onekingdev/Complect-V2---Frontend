"use strict";

const CRDImport = require( "../module/CRDImport" );
const { readDocuments, createDocuments, updateDocument } = require( "../helpers/crud" );
const { response, devStageLog } = require( "../helpers/utils" );
const { sendEmail } = require( "../modules/sendEmail" );


const findAndsendEmail = async ( data, scheduler, subject ) => {
	const userid = data.creator;

	const notifications = await readDocuments({
		collection: "notifications",
		query: { event_id: data._id }
	});

	for ( let i = 0; i < notifications.length; i++ ) if ( scheduler.indexOf( notifications[i].schedulers ) > -1 ) return;

	const user = await readDocuments({
		collection: "users",
		_id: userid,
		query: { notifications: scheduler }
	});
	// eslint-disable-next-line no-continue
	if ( !user || user.length === 0 ) return;

	await console.debug({
		template: scheduler,
		email: user.email,
		subject,
		data: {
			user_name: `${user.firstName} ${user.lastName}`,
			project_name: data.name
		}
	});

	if ( notifications.length > 0 )	for ( let i = 0; i < notifications.length; i++ ) {
		const schedulers = notifications[i].schedulers;
		schedulers.push( scheduler );
		await updateDocument({
			collection: "notifications",
			_id: notifications[i]._id,
			documents: { schedulers	}
		});
	}
	else await createDocuments({
		collection: "notifications",
		documents: {
			event_id: data._id,
			schedulers: [scheduler]
		}
	});
};

exports.projectEnd = async () => {
	try {
		const projects = await readDocuments({
			collection: "projects",
			query: { endsAt: { $lt: new Date( Date.now() + 86400000 ) }	}
		});
		for ( let i = 0; i < projects.length; i++ ) {
			await findAndsendEmail( projects[i], "projectEnd", "Project Ended in 24 hours" );
			// eslint-disable-next-line id-length
			for ( let j = 0; j < projects[i].collaborators.length; j++ ) {
				const col_email = projects[i].collaborators[j].email;
				const col_name = `${projects[i].collaborators[j].firstName} ${projects[i].collaborators[j].lastName}`;
				await sendEmail({
					template: "projectEnd",
					email: col_email,
					subject: "Project Ended in 24 hours",
					data: {
						user_name: col_name,
						project_name: projects[i].name
					}
				});
			}
		}
	} catch ( error ) {
		devStageLog( error );
	}
};

exports.jobStartCron = async () => {
	try {
		const jobs = await readDocuments({
			collection: "jobs",
			query: { startsAt: { $lt: new Date( Date.now() ) }	}
		});
		for ( let i = 0; i < jobs.length; i++ ) await findAndsendEmail( jobs[i], "jobStart", "Job Started" );
	} catch ( error ) {
		devStageLog( error );
	}
};

exports.jobPostingCron = async () => {
	try {
		const jobs = await readDocuments({
			collection: "jobs",
			query: {
				startsAt: { $lt: new Date( Date.now() + 172800000 ) },
				status: "pending"
			}
		});
		for ( let i = 0; i < jobs.length; i++ ) await findAndsendEmail( jobs[i], "jobPosting", "Job posting starts in 48 hours --- select a specialist" );
	} catch ( error ) {
		devStageLog( error );
	}
};

exports.contractEndCron = async () => {
	try {
		const contracts = await readDocuments({
			collection: "contracts",
			query: { endsAt: { $lt: new Date( Date.now() + 172800000 ) } }
		});
		for ( let i = 0; i < contracts.length; i++ ) await findAndsendEmail( contracts[i], "contractEnd", "Contract Ended in 24 hours" );
	} catch ( error ) {
		devStageLog( error );
	}
};

exports.crdScrapy = async () => {
	try {
		const crdImport = new CRDImport();
		await crdImport.initialize();
		await crdImport.call();
	} catch ( error ) {
		return response({
			httpCode: 400,
			message: error.message
		});
	}
};
