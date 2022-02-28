<template lang="pug">
.page-checkout
	main
		c-button(title="Back" @click="goBack()")
		header
			.title Time to power up
			.intro Review and confirm your subsctiption
		section
			.title Plan
			.content
				.plan
					.plan-name {{plan.name}}
					.plan-description {{plan.description}}
				.plan-price ${{plan.price}}/year

		section
			.content
				.plan
					.plan-name Payment Method
				c-button(title="Add Bank Account" v-if="isAddButtonVisible")
			stripe-elements(v-if="stripeLoaded && isAddButtonVisible" ref="elms" v-slot="{ elements, instance }" :stripe-key="publishkey" :instance-option="instanceOptions" :element-options="elementOptions")
				stripe-element(ref="card" :elements="elements" :options="cardOptions")
			c-button.add-button(title="Add" type="primary" @click="addPayment()" v-if="isAddButtonVisible")
			div.grid-6(v-if="!isAddButtonVisible")
				template(v-if="cardresult.card")
				.col-3 Credit Card (primary)
				.col-2 **** **** **** {{ cardresult.card.last4 }}
				.col-1
					c-button(title="Remove" type="link")


	card-container.summary(title="Purchase Summary")
		template(#sub-header)
			c-field.col-5(label="Promo Code")
			c-button.col-1.apply-promo(title="Apply" type="primary")
		template(#sub-header)
			c-field.col-5(label="Promo Code" v-model="promocode")
			c-button.col-1.apply-promo(title="Apply" type="primary" @click="applyPromo()")
		template(#content)
			.item
				.title {{plan.name}} plan
				.price ${{plan.price}}/year
			.item(v-if="promoInfo.percent_off")
				.title Discount
				.price {{promoInfo.percent_off}}%
			.item(v-if="promoInfo.amount_off")
				.title Discount
				.price -${{promoInfo.amount_off}}
			.total
				.title Total
				.price(v-if="promoInfo.percent_off") ${{plan.price * ( 100 - promoInfo.percent_off ) / 100}}
				.price(v-else-if="promoInfo.amount_off") ${{plan.price - promoInfo.amount_off}}
				.price(v-else) ${{plan.price}}
			c-button.purchase-button(title="Complete Purchase" type="plan" @click="onBoard()")
</template>


<script>
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import useForm from "~/store/Form.js";
import useAuth from "~/core/auth.js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElements, StripeElement } from "vue-stripe-js";
import { onBeforeMount, onMounted, ref } from "vue";
import useData from "~/store/Data.js";
import { manualApi } from "~/core/api.js";
export default {
	"components": { StripeElements, StripeElement },
	// eslint-disable-next-line max-statements
	setup () {
		const { profile } = useProfile();
		const userType = profile.value.type;
		const { form, resetForm } = useForm( "onboarding" );
		const { onboarding } = useAuth();
		const { readDocuments, documents } = useData( "plans" );
		const plan = ref({
			"name": "All Access Membership",
			"description": "Full access to all features and resources",
			"price": 400,
			"annually": true
		});
		const router = useRouter();
		const goBack = () => router.go( -1 );
		const isAddButtonVisible = ref( true );
		const publishkey = ref( "pk_test_V4rItWDTqr1AWyskRsxH12ZE" );
		const instanceOptions = ref({ });
		const elementsOptions = ref({ });
		const cardOptions = ref({ "value": { "postalCode": "" } });
		const stripeLoaded = ref( false );
		const card = ref();
		const elms = ref();
		const cardresult = ref({ });
		const promocode = ref();
		const promoInfo = ref({ });
		const addPayment = () => {
			const cardElement = card.value.stripeElement;
			elms.value.instance.createToken( cardElement ).then( async result => {
				const stripeToken = result.token.id;
				cardresult.value = result.token;
				try {
					await manualApi({
						"method": "post",
						"url": `payment/method/${userType === "business" ? form.value.businessId : form.value.specialistId}`,
						"newData": { stripeToken }
					});
					// notification({
					// 	"type": "success",
					// 	"title": "Success",
					// 	"message": "New Payment Method has been added successfully."
					// });
					isAddButtonVisible.value = !isAddButtonVisible.value;
				} catch ( error ) {
					// notification({
					// 	"type": "error",
					// 	"title": "Error",
					// 	"message": "New Payment Method has not been added. Please try again."
					// });
				}
			});
		};
		const onBoard = async () => {
			try {
				await manualApi({
					"method": "post",
					"url": `payment/subscription/${userType === "business" ? form.value.businessId : form.value.specialistId}`,
					"newData": {
						"planId": plan.value._id,
						"promocode": promocode.value
					}
				});
				await onboarding( form.value );
				profile.value.new = false;
				await resetForm();
				router.push({ "name": "Dashboard" });
			} catch ( error ) {
				console.error( error );
			}
		};
		const applyPromo = async () => {
			try {
				if ( promocode.value ) {
					const response = await manualApi({
						"method": "post",
						"url": "payment/promocode",
						"newData": { "promocode": promocode.value }
					});
					promoInfo.value = response.data;
				}
			} catch ( error ) {
				// notification({
				// 	"type": "Error",
				// 	"title": "Error",
				// 	"message": "You have inputted wrong promo code. Please try again."
				// });
			}
		};
		onBeforeMount( () => {
			const stripePromise = loadStripe( publishkey.value );
			stripePromise.then( () => stripeLoaded.value = true );
		});
		onMounted( async () => {
			await readDocuments();
			if ( userType === "business" ) {
				const keywordMethod = form.value.annually ? "yearly" : "monthly";
				const keywordTitle = `${form.value.plan} Plan`;
				const findplan = documents.value.find( indplan => indplan.method === keywordMethod && indplan.title.toLowerCase() === keywordTitle.toLowerCase() );
				plan.value.name = findplan.title;
				plan.value.price = findplan.perPrice;
				plan.value.annually = form.value.annually;
				plan.value._id = findplan._id;
			} else {
				const keywordMethod = form.value.annually ? "yearly" : "all";
				const findplan = documents.value.find( indplan => indplan.method === keywordMethod );
				plan.value.name = findplan.title;
				plan.value.price = findplan.perPrice;
				plan.value.annually = form.value.annually;
				plan.value._id = findplan._id;
			}
		});

		return { userType, plan, goBack, profile, form, onBoard, publishkey, instanceOptions, elementsOptions, cardOptions, card, elms, stripeLoaded, addPayment, isAddButtonVisible, cardresult, promoInfo, promocode,	applyPromo };
	}
};
</script>


<style lang="stylus" scoped>
.page-checkout
	display: flex
	align-items: center
	gap: 2em
	overflow: scroll
	min-height: 100%
	main
		flex: 3 0 auto
		background: var(--c-bg-z2)
		align-self: stretch
		padding: 2em
		border-right: 1px solid var(--c-border)
		.title
			font-size: 1.6em
		header
			line-height: 1.3
			margin: 2.5em 0
		section
			.content
				margin-top: 1em
				padding: 1.5em 0
				display: flex
				gap: 2em
				align-items: baseline
				justify-content: space-between
				border-top: 1px solid var(--c-border)
			.plan-name, .plan-price
				font-weight: bold
				font-size: 1.3em
				line-height: 1.2
			.plan-description
				margin-top: 0.5em
				color: #797b7e
				font-size: 0.9em
				line-height: 1.3
		.item
			.title
				font-weight: bold
				font-size: 1.3em

		.add-button
			margin-top: 2em
			margin-left: auto


	.summary
		margin-right: 2em
		flex: 1 3 20em
		min-width: 20em
		// max-width: 28em
		.apply-promo
			align-self: end
		.item
			border-bottom: 1px solid var(--c-border)
			padding-bottom: 2em
			line-height: 1.3
		.item, .total
			display: flex
			gap: 1em
			justify-content: space-between
		.price, .total
			font-weight: bold
		.total
			font-size: 1.3em
		.purchase-button
			margin-top: 2em

</style>
