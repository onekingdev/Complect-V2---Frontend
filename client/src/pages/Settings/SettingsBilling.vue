<template lang="pug">
card-container(title="Billing")
	template(#content)
		template(v-if="userType == 'business'")
			div.grid-6.sub-header
				h4.col-3 Payment Method
				div.col-2
				c-button.col-1.buttons(title="Add Payment" type="primary" @click="toggleNewMethod()")
			div.payment-content.grid-6(v-for="(payment, index) in payments")
				div.col-1.icon-content
					icon(name="number" size="huge")
				div.col-3
					h4(v-if="payment.object == 'card'") Credit Card
					h4(v-else) Bank Account
					h4 **** **** **** {{ payment.last4 }} {{ payment.brand }}
				c-button.col-1(title="Make Primary" v-if="customer?.invoice_settings?.default_payment_method != payment.id" @click="makePrimary(payment.id)")
				div.col-1(v-else)
				c-button.col-1(title="Delete")
		template(v-else)
			div.grid-6.sub-header
				h4.col-3 Clinet Billing
				div.col-2
				c-button.col-1.buttons(title="Add Bank Account" type="primary" @click="clientBilling()")
			template(v-if="linkaccount.account")
				div.payment-content.grid-6(v-for="(account, index) in linkaccount.account")
					div.col-1.icon-content
						icon(name="number" size="huge")
					div.col-3
						h4 Bank account
						h4 ******** {{ account.last4 }}
					// c-button.col-1(title="Make Primary" v-if="!account.primary" @click="makeAccountPrimary(account.accountId)")
					c-button.col-1(title="Edit")
					c-button.col-1(title="Remove")
			div.grid-6.sub-header
				h4.col-3 Payment Method
				div.col-2
				c-button.col-1.buttons(title="Add Payment" type="primary" @click="toggleNewMethod()")
			div.payment-content.grid-6(v-for="(payment, index) in payments")
				div.col-1.icon-content
					icon(name="number" size="huge")
				div.col-3
					h4(v-if="payment.object == 'card'") Credit Card
					h4(v-else) Bank Account
					h4 **** **** **** {{ payment.last4 }} {{ payment.brand }}
				c-button.col-1(title="Make Primary" v-if="customer?.invoice_settings?.default_payment_method != payment.id && payments.length > 1" @click="makePrimary(payment.id)")
				div.col-1(v-else)
				c-button.col-1(title="Delete")
c-modal(title="New Method" v-model="isNewMethodVisible")
	template(#content)
		stripe-elements(v-if="stripeLoaded" ref="elms" v-slot="{ elements, instance }" :stripe-key="publishkey" :instance-option="instanceOptions" :element-options="elementOptions")
			stripe-element(ref="card" :elements="elements" :options="cardOptions")
	template(#footer)
		c-button(title="Save" type="primary" @click="addPayment()")
</template>
<script>
import { ref, onMounted, onBeforeMount, inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import { loadStripe } from "@stripe/stripe-js";
import { StripeElements, StripeElement } from "vue-stripe-js";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
import useProfile from "~/store/Profile.js";
import cModal from "~/components/Misc/cModal.vue";
import { useRouter } from "vue-router";
import { manualApi } from "~/core/api.js";
export default {
	"components": { cSelect, cLabel, cBadge, StripeElements, StripeElement, cModal },
	// eslint-disable-next-line max-statements
	setup () {
		const { profile, linkaccount } = useProfile();
		const userType = profile.value.type;
		const router = useRouter();
		const notification = inject( "notification" );
		const publishkey = ref( "pk_test_V4rItWDTqr1AWyskRsxH12ZE" );
		const tokenCreated = token => console.debug( token );
		const elementRef = ref();
		const payments = ref([]);
		const customer = ref({});
		const getPayments = async () => {
			const response = await manualApi({
				"method": "get",
				"url": `payment/method/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`
			});
			payments.value = response.data;
		};
		const getCustomer = async () => {
			const customres = await manualApi({
				"method": "get",
				"url": `payment/customer/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`
			});
			customer.value = customres.data;
		};
		const makePrimary = async id => {
			try {
				await manualApi({
					"method": "put",
					"url": `payment/customer/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`,
					"data": JSON.stringify({ "invoice_settings": { "default_payment_method": id } })
				});
				await getCustomer();
				notification({
					"type": "success",
					"title": "Success",
					"message": "Payment method has been made the primary payment source."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Payment method has not been made the primary payment source. Please try again."
				});
			}
		};
		const instanceOptions = ref({ });
		const elementsOptions = ref({ });
		const cardOptions = ref({ "value": { "postalCode": "" } });
		const stripeLoaded = ref( false );
		const isNewMethodVisible = ref( false );
		const toggleNewMethod = () => isNewMethodVisible.value = !isNewMethodVisible.value;
		const card = ref();
		const elms = ref();
		const addPayment = () => {
			const cardElement = card.value.stripeElement;
			elms.value.instance.createToken( cardElement ).then( async result => {
				const stripeToken = result.token.id;
				try {
					await manualApi({
						"method": "post",
						"url": `payment/method/${userType === "business" ? profile.value.businessId : profile.value.specialistId}`,
						"data": JSON.stringify({ stripeToken })
					});
					notification({
						"type": "success",
						"title": "Success",
						"message": "New payment method has been added."
					});
					isNewMethodVisible.value = !isNewMethodVisible.value;
					await getPayments();
				} catch ( error ) {
					notification({
						"type": "error",
						"title": "Error",
						"message": "New payment method has not been added. Please try again."
					});
				}
			});
		};
		const clientBilling = () => router.push({ "name": "ClientBill" });
		onBeforeMount( () => {
			const stripePromise = loadStripe( publishkey.value );
			stripePromise.then( () => stripeLoaded.value = true );
		});
		onMounted( () => {
			getPayments();
			getCustomer();
		});
		return { publishkey, linkaccount, tokenCreated, addPayment, elementRef, payments, makePrimary, customer, instanceOptions, elementsOptions, cardOptions, card, elms, stripeLoaded, isNewMethodVisible, toggleNewMethod, userType, clientBilling };
	}
};
</script>
<style lang="stylus" scoped>
.sub-header
	.buttons
		display: flex;
		justify-content: center;
.payment-content
	border: 1px solid var(--c-border)
	border-radius: 5px
	padding: 1.25em
	.icon-content
		display: flex
		align-items: center
		justify-content: center
</style>
