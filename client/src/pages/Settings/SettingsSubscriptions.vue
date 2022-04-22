<template lang="pug">
card-container(title="Subscription")
	template(#content)
		template(v-if="isBusiness")
			div.grid-6.sub-header
				h4.col-3 Plan
			div.subscription-content.grid-6(v-if="linkaccount.currentPlan" :class="planClass")
				div.col-3.plan-type
					h4 {{ document.title }}
					p(v-if="isBusiness") {{ currentSeats }} active users
				div.col-2(v-if="!isBusiness")
				c-button.col-1(title="Cancel Plan" type="link" @click="toggleCancelVisible()")
				c-button.col-1(v-if="isBusiness" title="Edit Plan" type="default" @click="togglePlanVisible()")
				c-button.col-1(v-if="isBusiness" title="Upgrade" type="primary" @click="gotoPlan()")
				.border-line
				div.col-3.plan-type
					p ${{ document.perPrice }}/{{ document.method?.replace('ly', '') }}, billed {{ document.method }} to Visa **** **** **** 1111
				div.col-3.plan-period
					p Next payment date {{ formatDate(linkaccount.currentPlan.subscriptionEndAt * 1000) }}
		template(v-else)
			div.grid-6.sub-header(v-if="linkaccount.currentPlan")
				h4.col-3 Plan
			div.subscription-content.grid-6(v-if="linkaccount.currentPlan" :class="planClass")
				div.col-3.plan-type
					h4 All Access Membership
				div.col-2
				c-button.col-1(title="Cancel Plan" type="link" @click="toggleCancelVisible()")
				.border-line
				div.col-3.plan-type
					p ${{ document.perPrice }}/{{ document.method?.replace('ly', '') }}, billed {{ document.method }} to Visa **** **** **** 1111
				div.col-3.plan-period
					p Next payment date {{ formatDate(linkaccount.currentPlan.subscriptionEndAt * 1000) }}
			div.free-plan.grid-6(v-else)
				.free-icon.col-1
					icon(name="mail" size="huge")
				.col-3.free-plan-content
					h4 Get hired for your next big job.
					p.col-3 Sign up for All Access Membership are unlock the compliance job board, remote client program management
				c-button.col-1(title="More Information" type="default" @click="gotoMoreInfo()")
				c-button.col-1(title="Upgrade Now" iconR="chevron-right" type="primary" @click="gotoPlan()")
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
c-modal(title="Edit Seats" v-model="isEditPlanVisible" wide)
	template(#content)
		div.col-4.grid-6
			p  You currently have {{ currentSeats }} seats
			c-select.col-3(label="Billing Plan" :data="formOptions.payments" v-model="billingPlan")
			c-field.col-3(label="Add Seats" v-model="addSeats")
			.col-3
			c-field.col-3.align-right(label="Remove Seats" v-model="removeSeats")
		div.col-2.payment-info
			p.payment-title SEATS
			template(v-if="addSeats > 0")
				p.payment-text ${{ billingPlan }}/month
				p.payment-title TOTAL
				p.payment-text(v-if="billingPlan == 15") ${{ billingPlan * addSeats }}/month
				p.payment-text(v-if="billingPlan == 10") ${{ billingPlan * addSeats * 12 }}/year
				p.save(v-if="billingPlan == 10 && addSeats") You saved ${{ 60 * addSeats }}
			template(v-if="(!addSeats || addSeats == 0) && currentSeats - removeSeats < usedSeats")
				p You are currently using {{ usedSeats }} out of {{ currentSeats }} of available seats. You may need to disable users in order to remove seats.
		h4 Payment Method
			c-radios(:data="payments" v-model="payInfo")
	template(#footer)
		c-button(title="Save" type="primary" @click="saveUsers()")
</template>
<script>
import { ref, inject, onMounted, computed } from "vue";
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
import cModal from "~/components/Misc/cModal.vue";
import { notifyMessages } from "~/data/notifications.js";

// import { plans } from "~/data/plans.js";
export default {
	"components": { cSelect, cLabel, cBadge, cSwitcher, cPlans, cRadios, cModal },
	// eslint-disable-next-line
	setup () {
		const { profile, linkaccount, isBusiness } = useProfile();
		const notification = inject( "notification" );
		const router = useRouter();
		const planCollection = new UseData( "plans" );
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
		const billingPlan = ref( 10 );
		const addSeats = ref( 0 );
		const removeSeats = ref( 0 );
		const currentSeats = computed( () => {
			const freeSeats = planCollection.getDocument().value.seatCount || 0;
			const paidSeats = linkaccount.value.seatQty || 0;
			return freeSeats + paidSeats;
		});
		const usedSeats = ref( 7 );
		const payInfo = ref();
		const payments = ref([]);
		const getSubscription = async businessId => {
			const subres = await manualApi({
				"method": "get",
				"url": `payment/subscription/${businessId}`
			});
			subscription.value = subres.data;
			subscription.value = subres.data.find( sub => sub.id === linkaccount.value.currentPlan?.subId );
		};
		const getPayments = async () => {
			const response = await manualApi({
				"method": "get",
				"url": `payment/method/${isBusiness ? profile.value.businessId : profile.value.specialistId}`
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
		const gotoMoreInfo = () => window.location.href = "https://www.complect.com/specialists";
		const saveUsers = async () => {
			try {
				if ( addSeats.value > 0 ) {
					const planId = planCollection.getDocuments().value.find( doc => doc.amount === billingPlan.value );
					await manualApi({
						"method": "post",
						"url": `payment/subscription/${isBusiness ? profile.value.businessId : profile.value.specialistId}`,
						"data": JSON.stringify({
							"planId": planId._id,
							"cardId": payInfo.value
						})
					});
					isEditPlanVisible.value = !isEditPlanVisible.value;
					notification({
						"type": "success",
						"title": "Success",
						"message": notifyMessages.seat.add.success
					});
				} else if ( ( addSeats.value === 0 || !addSeats.value ) && removeSeats.value > 0 ) {
					// eslint-disable-next-line max-depth
					if ( currentSeats.value - removeSeats.value < currentSeats.value ) {
						notification({
							"type": "error",
							"title": "Error",
							"message": notifyMessages.seat.add.validate
						});
					} else {
						isEditPlanVisible.value = !isEditPlanVisible.value;
						notification({
							"type": "success",
							"title": "Success",
							"message": notifyMessages.seat.add.success
						});
					}
				}
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.seat.add.error
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
					"message": notifyMessages.subscription.cancel.success
				});
			} catch ( error ) {
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.subscription.cancel.error
				});
			}
		};
		onMounted( () => {
			if ( linkaccount.value?.currentPlan?.planId )	{
				planCollection.readDocuments( linkaccount.value.currentPlan.planId );
				getSubscription( linkaccount.value._id );
			}
			planCollection.readDocuments();
			getPayments();
		});
		return {
			"document": planCollection.getDocument(),
			subscription,
			formatDate,
			linkaccount,
			planClass,
			gotoPlan,
			formOptions,
			form,
			// plans,
			gotoMoreInfo,
			billingPlan,
			payments,
			payInfo,
			saveUsers,
			addSeats,
			removeSeats,
			currentSeats,
			usedSeats,
			togglePlanVisible,
			toggleCancelVisible,
			isCancelVisible,
			isEditPlanVisible,
			cancelPlan,
			isBusiness
		};
	}
};
</script>
<style lang="stylus" scoped>
.subscription-content
	border: 1px solid var(--c-border)
	border-radius: 5px
	padding: 1.25em
	.plan-type
		h4
			font-size: 18px
			font-weight: 700
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
.free-plan
	border: 1px solid var(--c-border)
	border-radius: 5px
	padding: 1.25em
	align-item: center
	.free-icon
		display: flex
		align-items: center
		justify-content: center
	.free-plan-content
		h4
			font-size: 18px
			font-weight: 700
	.c-button
		max-height: 3em
		top: 1em
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
	.save
		color: var(--c-green)
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
