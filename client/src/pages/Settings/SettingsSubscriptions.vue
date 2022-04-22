<template lang="pug">
card-container(title="Subscription")
	template(#content)
		div.grid-6.sub-header
			h4.col-3 Plan
		div.subscription-content.grid-6(v-if="linkaccount.currentPlan" :class="planClass")
			div.col-3.plan-type
				h4 {{ document.title }}
				p(v-if="userType=='business'") {{ document.seatCount + (linkaccount.seatQty?linkaccount.seatQty:0) }} available users ( {{ document.seatCount }} free users and {{ linkaccount.seatQty?linkaccount.seatQty:0 }} paid users )
			div.col-2(v-if="userType!='business'")
			c-button.col-1(title="Cancel Plan" type="link" @click="toggleCancelVisible()")
			c-button.col-1(v-if="userType=='business'" title="Edit Plan" type="default" @click="togglePlanVisible()")
			c-button.col-1(v-if="userType=='business'" title="Upgrade" type="primary" @click="gotoPlan()")
			.border-line
			div.col-3.plan-type
				p ${{ document.perPrice }} billed {{ document.method }} to **** **** **** 1111
			div.col-3.plan-period
				p Next payment date {{ formatDate(linkaccount.currentPlan.subscriptionEndAt * 1000) }}
c-modal(title="Cancel Plan" v-model="isCancelVisible")
	template(#content)
		.delete-container
			div
				icon(name="error" size="big")
			.description
				p You are canceling your subscription to Complect. This will terminate your access to our full suite of features on {{ formatDate(linkaccount.currentPlan.subscriptionEndAt * 1000) }} when your subscription ends.
				p If you have more than 1GB of stored data or users, this will cause your account to be locked until you upgrade to a paid plan.
				p.confirm Do you want to continue?
	template(#footer)
		c-button(title="Confirm" type="primary" @click="cancelPlan()")
c-modal(title="Edit Plan" v-model="isEditPlanVisible" wide)
	template(#content)
		div.col-4.grid-6
			p Your organization currently has 2 active users
			c-select.col-3(label="Billing Plan" :data="formOptions.payments" v-model="billingPlan")
			c-field.col-3(label="Additional Users" v-model="billUsers")
		div.col-2.payment-info
			p.payment-title USERS
			p.payment-text ${{ billingPlan }}/month
			p.payment-title TOTAL
			p.payment-text(v-if="billingPlan == 15") ${{ billingPlan * billUsers }}/month
			p.payment-text(v-if="billingPlan == 10") ${{ billingPlan * billUsers * 12 }}/yearly
		h4 Payment Method
			c-radios(:data="payments" v-model="payInfo")
	template(#footer)
		c-button(title="Save" type="primary" @click="saveUsers()")
</template>
<script>
import { ref, inject, onMounted } from "vue";
import { useRouter } from "vue-router";
import UseData from "~/store/Data.js";
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
// import { plans } from "~/data/plans.js";
export default {
	"components": { cSelect, cLabel, cBadge, cSwitcher, cPlans, cRadios },
	// eslint-disable-next-line
	setup () {
		const { profile, linkaccount } = useProfile();
		const notification = inject( "notification" );
		const router = useRouter();
		const planCollection = new UseData( "plans" );
		const tokenCreated = token => console.debug( token );
		const addPayment = () => console.debug( "test" );
		const elementRef = ref();
		const subscription = ref({});
		const isCancelVisible = ref( false );
		const isEditPlanVisible = ref( false );
		const togglePlanVisible = () => isEditPlanVisible.value = !isEditPlanVisible.value;
		const toggleCancelVisible = () => isCancelVisible.value = !isCancelVisible.value;
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
					"value": 10
				}, {
					"title": "Billed Monthly",
					"value": 15
				}
			]
		};
		const billingPlan = ref( 0 );
		const billUsers = ref( 0 );
		const payInfo = ref();
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
			for ( let i = 0; i < response.data.length; i++ ) {
				paymentInfo.push({
					"value": response.data[i].id,
					"title": `**** **** **** ${response.data[i].last4} ${response.data[i].brand}`
				});
			}
			payments.value = paymentInfo;
		};
		const gotoPlan = () => router.push({ "name": "BillingPlan" });
		const saveUsers = async () => {
			try {
				const planId = planCollection.getDocuments().value.find( doc => doc.amount === billingPlan.value );
				await manualApi({
					"method": "post",
					"url": `payment/subscription/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`,
					"data": JSON.stringify({
						"planId": planId._id,
						"cardId": payInfo.value
					})
				});
				isEditPlanVisible.value = !isEditPlanVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "Seats are sucessfully added"
				});
			} catch ( error ) {
				notification({
					"type": "success",
					"title": "Success",
					"message": "Seats has not been added. Please try again."
				});
			}
		};
		const cancelPlan = async () => {
			try {
				await manualApi({
					"method": "delete",
					"url": `payment/subscription/${linkaccount.value._id}/${linkaccount.value.currentPlan.subId}`
				});
				isCancelVisible.value = !isCancelVisible.value;
				notification({
					"type": "success",
					"title": "Success",
					"message": "Subscription successfully cancelled."
				});
			} catch ( error ) {
				notification({
					"type": "success",
					"title": "Success",
					"message": "Subscription has not been cancelled. Please try again."
				});
			}
		};
		onMounted( () => {
			console.debug( linkaccount.value );
			if ( linkaccount.value?.currentPlan?.planId )	{
				planCollection.readDocuments( linkaccount.value.currentPlan.planId );
				getSubscription( linkaccount.value._id );
			}
			planCollection.readDocuments();
			getPayments();
		});
		return {
			"document": planCollection.getDocument(),
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
			// plans,
			userType,
			billingPlan,
			payments,
			payInfo,
			saveUsers,
			billUsers,
			togglePlanVisible,
			toggleCancelVisible,
			isCancelVisible,
			isEditPlanVisible,
			cancelPlan
		};
	}
};
</script>
<style lang="stylus" scoped>
.subscription-content
	border: 1px solid var(--c-border)
	border-radius: 5px
	padding: 1.25em
	.icon-content
		display: flex
		align-items: center
		justify-content: center
	.border-line
		border-bottom: 1px solid #eee
	.plan-period
		text-align: right
	&.plan-show
		display: none
.payment-info
	padding: 0.7em 2em
	border: 1px solid var(--c-border)
	border-radius: 5px
	display: flex
	flex-direction: column
	.payment-title
		color: #aaa
	.payment-text
		margin-bottom: 0.7em
.plan-content.plan-hide
	display: none
.delete-container
	display: flex
	gap: 1.25em
	.description
		font-size: 0.875em
		.confirm
			padding-top: 0.625em
			font-weight: bold
</style>
