<template lang="pug">
.page-checkout
	main
		c-button(title="Back" @click="goBack()")
		header
			.title Time to power up
			.intro Review and confirm your subsctiption
		section
			.title_container
				.title_plan Plan
				c-switcher(id="payment1" v-if="userType === 'business'" :options="paymentOptions" v-model="form.annually" type="primary")
			.content
				.plan
					.plan-name {{plan.title}}
					.plan-description {{plan.intro}}
				template(v-if="plan.price")
					template(v-if="userType === 'business'")
						template(v-if="form.annually")
							.plan
								.plan-price ${{plan.price[0] * 12}}/year
								.plan-description(v-if="plan.users") {{plan.users[0]}}
						template(v-else)
							.plan
								.plan-price ${{plan.price[1]}}/mo
								.plan-description(v-if="plan.users") {{plan.users[1]}}
					template(v-else)
						.plan
							.plan-price ${{plan.price[0]}}/year
		section(v-if="userType === 'business'")
			.content
				.plan
					.plan-name Users
					.plan-description Enter the number of users (this is often your employee headcount)
				.plan
					.user_input
						input(v-model="users" type="number")
		section
			.content
				.plan
					.plan-name Payment Method
				c-button(title="Add Bank Account" v-if="isAddButtonVisible")
			stripe-elements.stripe(v-if="stripeLoaded && isAddButtonVisible" ref="elms" v-slot="{ elements, instance }" :stripe-key="publishkey" :instance-option="instanceOptions" :element-options="elementOptions")
				stripe-element(ref="card" :elements="elements" :options="cardOptions" @change="stripeChange($event)")
			c-button.add-button(title="Add" type="primary" @click="addPayment()" v-if="isAddButtonVisible")
			div.grid-6(v-if="!isAddButtonVisible")
				template(v-if="cardresult.card")
				.col-3 Credit Card (primary)
				.col-2 **** **** **** {{ cardresult.card.last4 }}
				.col-1
					c-button(title="Remove" type="link")
	card-container.summary(title="Purchase Summary")
		template(#sub-header)
			c-field.col-5(label="Promo Code" v-model="promocode")
			c-button.col-1.apply-promo(title="Apply" type="primary" @click="applyPromo()")
		template(#content)
			.plan_content
				.plan_item
					.price {{plan.title}} plan
					template(v-if="plan.price")
						template(v-if="userType === 'business'")
							template(v-if="form.annually")
								.price ${{plan.price[0] * 12}}/year
							template(v-else)
								.price ${{plan.price[1]}}/mo
						template(v-else)
							.plan
								.plan-price ${{plan.price[0]}}/year
				.plan_item(v-if="userType === 'business'")
					.title {{users}} Users ({{plan.freeUsers}} Free)
					template(v-if="users > plan.freeUsers")
						template(v-if="form.annually")
							.price +${{(users - plan.freeUsers) * 120}}
						template(v-else)
							.price +${{(users - plan.freeUsers) * 15}}
				.plan_item.save(v-if="userType === 'business'")
					template(v-if="form.annually && plan.price")
						.title Billed Annually
						.save_price You saved ${{ (plan.price[1] - plan.price[0]) * 12 }}
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
				.price(v-else)
					template(v-if="plan.price")
						template(v-if="userType === 'business'")
							template(v-if="users > plan.freeUsers")
								template(v-if="form.annually")
									.price ${{plan.price[0] * 12 + (users - plan.freeUsers) * 120}}
								template(v-else)
									.price ${{plan.price[1] + (users - plan.freeUsers) * 15}}
							template(v-else)
								template(v-if="form.annually")
									.price ${{plan.price[0] * 12}}
								template(v-else)
									.price ${{plan.price[1]}}
						template(v-else)
							.price ${{plan.price[0]}}
			c-button.purchase-button(title="Complete Purchase" type="primary" :disabled="isPurchaseVisible" @click="onBoard()")
</template>


<script>
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import useForm from "~/store/Form.js";
import useAuth from "~/core/auth.js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElements, StripeElement } from "vue-stripe-js";
import { onBeforeMount, onMounted, ref, inject } from "vue";
import UseData from "~/store/Data.js";
import { plans } from "~/data/plans.js";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import { manualApi } from "~/core/api.js";
export default {
	"components": { StripeElements, StripeElement, cSwitcher },
	// eslint-disable-next-line
	setup () {
		const { profile } = useProfile();
		const userType = profile.value.type;
		const { form, resetForm } = useForm( "onboarding" );
		const { onboarding } = useAuth();
		// const plans = new UseData( "plans" );
		const notification = inject( "notification" );
		const plan = ref({});
		const router = useRouter();
		const goBack = () => router.go( -1 );
		const isAddButtonVisible = ref( true );
		const isPurchaseVisible = ref( true );
		const publishkey = ref( import.meta.env.VITE_STRIPE );
		const instanceOptions = ref({ });
		const elementsOptions = ref({ });
		const cardOptions = ref({ "value": { "postalCode": "" } });
		const stripeLoaded = ref( false );
		const card = ref();
		const elms = ref();
		const users = ref( 0 );
		const cardresult = ref({ });
		const promocode = ref();
		const promoInfo = ref({ });
		const paymentOptions = ref([
			{
				"title": "Billed Annually",
				"value": true
			}, {
				"title": "Billed Monthly",
				"value": false
			}
		]);
		const stripeChange = e => isPurchaseVisible.value = !e.complete;
		const addPayment = () => {
			const cardElement = card.value.stripeElement;
			elms.value.instance.createToken( cardElement ).then( async result => {
				const stripeToken = result.token.id;
				cardresult.value = result.token;
				try {
					await manualApi({
						"method": "post",
						"url": `payment/method/${userType === "business" ? form.value.businessId : form.value.specialistId}`,
						"data": JSON.stringify({ stripeToken })
					});
					notification({
						"type": "success",
						"title": "Success",
						"message": "New Payment Method has been added successfully."
					});
					isAddButtonVisible.value = !isAddButtonVisible.value;
				} catch ( error ) {
					notification({
						"type": "error",
						"title": "Error",
						"message": "New Payment Method has not been added. Please try again."
					});
				}
			});
		};
		const onBoard = async () => {
			try {
				if ( userType === "business" ) {
					const business = new UseData( "business" );
					const ids = await business.createDocuments([form.value]);
					await manualApi({
						"method": "post",
						"url": `payment/customer/${ids[0]}`,
						"data": JSON.stringify({})
					});
					// await onboarding({ "businessId": ids[0] });
					// eslint-disable-next-line require-atomic-updates
					form.value.businessId = ids[0];
				} else {
					const specialist = new UseData( "specialist" );
					const ids = await specialist.createDocuments([form.value]);
					await manualApi({
						"method": "post",
						"url": `payment/customer/${ids[0]}`,
						"data": JSON.stringify({})
					});
					// await onboarding({ "specialistId": ids[0] });
					// eslint-disable-next-line require-atomic-updates
					form.value.specialistId = ids[0];
				}

				await manualApi({
					"method": "post",
					"url": `payment/subscription/${userType === "business" ? form.value.businessId : form.value.specialistId}`,
					"data": JSON.stringify({
						// "planId": plan.value._id,
						"promocode": promocode.value
					})
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
						"data": JSON.stringify({ "promocode": promocode.value })
					});
					promoInfo.value = response.data;
				}
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "You have inputted wrong promo code. Please try again."
				});
			}
		};
		onBeforeMount( () => {
			const stripePromise = loadStripe( publishkey.value );
			stripePromise.then( () => stripeLoaded.value = true );
		});
		onMounted( () => {
			plan.value = plans[userType].find( item => item.key === form.value.plan );
			// plans.readDocuments();
			// if ( userType === "business" ) {
			// 	const keywordMethod = form.value.annually ? "yearly" : "monthly";
			// 	const keywordTitle = `${form.value.plan} Plan`;
			// 	const findplan = plans.getDocuments().value.find( indplan => indplan.method === keywordMethod && indplan.title.toLowerCase() === keywordTitle.toLowerCase() );
			// 	plan.value.name = findplan.title;
			// 	plan.value.price = findplan.perPrice;
			// 	plan.value.annually = form.value.annually;
			// 	plan.value._id = findplan._id;
			// } else {
			// 	const keywordMethod = form.value.annually ? "yearly" : "all";
			// 	const findplan = plans.getDocuments().value.find( indplan => indplan.method === keywordMethod );
			// 	plan.value.name = findplan.title;
			// 	plan.value.price = findplan.perPrice;
			// 	plan.value.annually = form.value.annually;
			// 	plan.value._id = findplan._id;
			// }
		});

		// eslint-disable-next-line max-len
		return { userType, plan, stripeChange, paymentOptions, users, goBack, profile, form, onBoard, publishkey, instanceOptions, elementsOptions, cardOptions, card, elms, stripeLoaded, addPayment, isAddButtonVisible, isPurchaseVisible, cardresult, promoInfo, promocode,	applyPromo };
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
			.title_container
				display: flex
				justify-content: space-between
				margin-bottom: 2em
			.title_plan
				font-size: 1.5em
			.title
				margin-bottom: 1em
			.content
				padding: 1.5em 0
				display: flex
				gap: 2em
				align-items: center
				justify-content: space-between
				border-top: 1px solid var(--c-border)
				.user_input
					background: var(--c-bg-z2);
					box-shadow: 0 0 0 1px var(--c-border);
					border-radius: var(--v-inputs-border-radius);
					overflow: hidden;
					display: flex;
					align-items: center;
					gap: 0.3em;
					padding: 0.35em 0.5em;
					width: 4em;
					min-height: 2em;
					input
						font-size: 0.9em;
						flex: 1 0 auto;
						width: 1em;
						color: #000;
						background: transparent;
						border: none;
						outline: none;
						line-height: 1.3;
						padding: 0;
						margin: 0;
			.plan-name, .plan-price
				font-weight: bold
				font-size: 1.3em
				line-height: 1.2
			.plan-price
				display: flex
				justify-content: end
			.plan-description
				margin-top: 0.5em
				color: #797b7e
				font-size: 0.9em
				line-height: 1.3
			.stripe
				box-sizing: border-box;
				padding: 0.625em 0.75em;
				border-radius: 4px;
				background-color: white;
				box-shadow: 0 1px 3px 0 #e6ebf1;
				-webkit-transition: box-shadow 150ms ease;
				transition: box-shadow 150ms ease;
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
		.plan_content
			display: flex
			flex-direction: column
			gap: 0.4em
			padding-bottom: 1.5em
			border-bottom: 1px solid var(--c-border)
			font-size: 0.875em
			.plan_item
				display: flex
				justify-content: space-between
		.save
			color: var(--c-green)
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
