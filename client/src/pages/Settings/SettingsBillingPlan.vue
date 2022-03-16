<template lang="pug">
card-container
	template(#content)
		.plan-content(:class="planClass")
			div.plan-settings.grid-6(:class="{'hide-setting': !isPlan}")
				.plan-header
					.title Choose your plan
					c-switcher(id="payment" :options="formOptions.payments" v-model="form.annually" type="primary" fullwidth)
				c-plans(:plans="plans[userType]" :annually="form.annually" v-model="form.plan" @checkout="goToCheckout()")
			div.checkout-settings(:class="{'hide-setting': isPlan}")
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
								c-button(title="Add Bank Account")
							div.payment-content.grid-6
								div.icon-content
									c-radios(:data="payments" v-model="payInfo")
							// stripe-element-card(ref="elementRef" :pk="publishkey" @token="tokenCreated")
							c-button.add-button(title="Add" type="primary")


					card-container.summary(title="Purchase Summary")
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
							c-button.purchase-button(title="Complete Purchase" type="plan" @click="completePurchase()")
</template>
<script>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cRadios from "~/components/Inputs/cRadios.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cPlans from "~/components/Misc/cPlans.vue";
import useProfile from "~/store/Profile.js";
import { manualApi } from "~/core/api.js";
import { formatDate } from "~/core/utils";
import useForm from "~/store/Form.js";
import { plans } from "~/data/plans.js";
export default {
	"components": { cSelect, cLabel, cBadge, cSwitcher, cPlans, cRadios },
	// eslint-disable-next-line
	setup () {
		const notification = inject( "notification" );
		const router = useRouter();
		const { profile, linkaccount } = useProfile();
		const { document, readDocuments, documents } = useData( "plans" );
		const tokenCreated = token => console.debug( token );
		const addPayment = () => console.debug( "test" );
		const elementRef = ref();
		const subscription = ref({});
		const promocode = ref();
		const promoInfo = ref({ });
		const planClass = ref( "plan-hide" );
		const baseForm = {
			"specialist": {
				"crd": false,
				"annually": true,
				"plan": "standard"
			},
			"business": {
				"regulator": false,
				"annually": true,
				"plan": "starter"
			}
		};
		const userType = profile.value.type;
		const { form } = useForm( "onboarding", baseForm[userType]);
		const plan = ref({
			"name": "All Access Membership",
			"description": "Full access to all features and resources",
			"price": 400,
			"annually": true
		});
		const formOptions = {
			"skills": [
				{ "title": "HTML", "value": "html" }, { "title": "CSS", "value": "css" }, { "title": "Javascript", "value": "js" }
			],
			"experience": [
				{ "value": 0, "title": "Junior", "description": "Beginner consultant with some industry experience." }, { "value": 1, "title": "Intermediate", "description": "Good experience and solid knowledge of the industry." }, { "value": 2, "title": "Expert", "description": "Deep understanding of industry with varied experience." }
			],
			"payments": [
				{
					"title": "Billed Annually",
					"value": true
				}, {
					"title": "Billed Monthly",
					"value": false
				}
			]
		};
		const billingPlan = ref( 0 );
		const billUsers = ref( 0 );
		const payInfo = ref();
		const isPlan = ref( true );
		const payments = ref([]);
		const getSubscription = async businessId => {
			const subres = await manualApi({
				"method": "get",
				"url": `payment/subscription/${businessId}`
			});
			subscription.value = subres.data;
			subscription.value = subres.data?.data.filter( sub => sub.id === linkaccount.value.currentPlan?.subId )[0];
		};
		const getPayments = async () => {
			const response = await manualApi({
				"method": "get",
				"url": `payment/method/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`
			});
			const paymentInfo = [];
			for ( let i = 0; i < response.data.data.length; i++ ) {
				paymentInfo.push({
					"value": response.data.data[i].id,
					"title": `**** **** **** ${response.data.data[i].last4} ${response.data.data[i].brand}`
				});
			}
			payments.value = paymentInfo;
		};
		const gotoPlan = () => planClass.value = "plan-show";
		const goToCheckout = () => {
			isPlan.value = false;
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
		};
		const goBack = () => isPlan.value = true;
		const completePurchase = async () => {
			try {
				await manualApi({
					"method": "post",
					"url": `payment/subscription/${linkaccount.value._id}`,
					"newData": {
						"planId": plan.value._id,
						"cardId": payInfo.value,
						"promocode": promocode.value
					}
				});
				notification({
					"type": "success",
					"title": "Success",
					"message": "Plan has been upgraded successfully."
				});
				router.push({ "name": "Dashboard" });
			} catch ( erorr ) {
				notification({
					"type": "Error",
					"title": "Error",
					"message": "Plan has not been upgraded successfully. Please try again."
				});
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
				notification({
					"type": "Error",
					"title": "Error",
					"message": "You have inputted wrong promo code. Please try again."
				});
			}
		};
		onMounted( () => {
			console.debug( linkaccount.value );
			if ( linkaccount.value?.currentPlan?.planId )	{
				readDocuments( linkaccount.value.currentPlan.planId );
				getSubscription( linkaccount.value._id );
			}
			readDocuments();
			getPayments();
		});
		return {
			document,
			tokenCreated,
			addPayment,
			elementRef,
			subscription,
			formatDate,
			linkaccount,
			planClass,
			gotoPlan,
			formOptions,
			form,
			plans,
			userType,
			billingPlan,
			payments,
			payInfo,
			billUsers,
			plan,
			isPlan,
			goToCheckout,
			goBack,
			completePurchase,
			promoInfo,
			promocode,
			applyPromo
		};
	}
};
</script>
<style lang="stylus" scoped>
.plan-header
	text-align: center
	margin: 0 auto 2em
	.title
		font-size: 2em
	.subtitle
		color: #797b7e
	.c-button, .c-switcher
		margin: 1em auto 0
.c-switcher
	margin: 0 auto 1em
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
			.payment-title
				text-align: right
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
.hide-setting
	display: none
</style>
