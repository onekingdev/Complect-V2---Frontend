<template lang="pug">
.onboarding-form
	card-container(title="Set Up Your Account")
		template(#content)
			//- Business
			c-form-wizard(:steps="wizardSteps")
				template(#step1)
					c-select.col-3(label="Account Type" placeholder="Select Account Type" :data="accountType" v-model="payoutForm.accountType" required)
					div.col-3
					template(v-if="payoutForm.accountType == 'company'")
						c-field.col-3(label="Legal Business Name" placeholder="Legal business name" v-model="payoutForm.businesName" required)
						div.col-3
					template(v-if="payoutForm.accountType == 'individual'")
						c-field.col-1(label="Legal First Name" placeholder="Legal first name" v-model="payoutForm.firstName" required)
						div.col-1
						c-field.col-1(label="Legal Business Name" placeholder="Legal last name" v-model="payoutForm.lastName" required)
						div.col-3
					c-select.col-3(label="Country" placeholder="Select Account Type" :data="selectCountries" v-model="payoutForm.countries" searchable required)
				template(#step2)
					section
						.header Tell us more about your business:
						.intro We will use this to verify your identify
						.inputs.grid-6
							c-field.col-3(label="Date of birth" type="date" v-model="payoutForm.DOB" placeholder="MM/DD/YYYY" required)
							c-field.col-3(label="Business tax" v-model="payoutForm.businessTax" placeholder="000000000" required)
							c-field.col-6(label="Business Address" v-model="payoutForm.address" placeholder="Address" required)
							c-field.col-2(label="City" v-model="payoutForm.city" placeholder="City" required)
							c-field.col-2(label="State" v-model="payoutForm.state" placeholder="State" required)
							c-field.col-2(label="Zip" v-model="payoutForm.zip" placeholder="Zip" required)
				template(#step3)
					c-field.col-3(label="Routing Number" v-model="payoutForm.routingNumber" placeholder="Routing number" required)
					br
					c-field.col-3(label="Account Number" v-model="payoutForm.accountNumber" placeholder="Account number" required)
					br
					c-field.col-3(label="Confirm Account Number" v-model="payoutForm.confirmAccountNumber" placeholder="Account number" required)
				template(#controls)
					c-button(title="Submit" type="primary" @click="submitClientBilling()")
</template>


<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import useForm from "~/store/Form.js";
import cFormWizard from "~/components/FormWizard/cFormWizard.vue";
import cRadios from "~/components/Inputs/cRadios.vue";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cDropzone from "~/components/Inputs/cDropzone.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import cPlans from "~/components/Misc/cPlans.vue";
import { manualApi } from "~/core/api.js";
import UseData from "~/store/Data.js";

import { selectCountries } from "~/data/static.js";
import { plans } from "~/data/plans.js";
import { notifyMessages } from "~/data/notifications.js";

export default {
	"components": {
		cFormWizard,
		cRadios,
		cRadioCards,
		cSelect,
		cDropzone,
		cSwitcher,
		cPlans
	},
	setup () {
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
		const router = useRouter();
		const { profile } = useProfile();
		const userType = profile.value.type;
		const { form } = useForm( "onboarding", baseForm[userType]);
		const notification = inject( "notification" );

		const wizardSteps = [
			{ "title": "Account information" },	{ "title": "Personal information" }, { "title": "Payout type" }
		];
		const accountType = [
			{ "title": "Business", "value": "company" }, { "title": "Individual", "value": "individual" }
		];


		const payoutForm = ref({
			"accountType": "",
			"businesName": "",
			"firstName": "",
			"lastName": "",
			"country": "",
			"DOB": "",
			"businessTax": "",
			"address": "",
			"city": "",
			"state": "",
			"zip": "",
			"routingNumber": "",
			"accountNumber": "",
			"confirmAccountNumber": ""
		});

		// eslint-disable-next-line max-statements
		const submitClientBilling = async () => {
			try {
				const requestBody = {};
				requestBody.type = "custom";
				requestBody.country = "US";
				requestBody.email = profile.value.email;
				// eslint-disable-next-line camelcase
				requestBody.requested_capabilities = { "0": "transfers" };
				requestBody.settings = { "payouts": { "debit_negative_balances": "true" } };
				let accountname;
				if ( payoutForm.value.accountType === "company" ) {
					// eslint-disable-next-line camelcase
					requestBody.business_type = "company";
					requestBody.company = { "name": payoutForm.value.businesName };
					accountname = payoutForm.value.businesName;
				} else {
					// eslint-disable-next-line camelcase
					requestBody.business_type = "individual";
					requestBody.individual = {
						"first_name": payoutForm.value.firstName,
						"last_name": payoutForm.value.lastName
					};
					accountname = `${payoutForm.value.firstName} ${payoutForm.value.lastName}`;
				}
				// eslint-disable-next-line camelcase
				requestBody.external_account = {
					"object": "bank_account",
					"country": "US",
					"currency": "usd",
					"account_holder_name": accountname,
					"account_holder_type": payoutForm.value.accountType,
					"routing_number": payoutForm.value.routingNumber,
					"account_number": payoutForm.value.accountNumber
				};
				const response = await manualApi({
					"url": "payment/account",
					"method": "post",
					"data": JSON.stringify( requestBody )
				});
				const specialist = new UseData( "specialist" );
				await specialist.readDocuments( profile.value.specialistId );
				const account = specialist.getDocument().value.account || [];
				let primary;
				primary = true;
				if ( account.length > 0 ) primary = false;
				account.push({
					"accountId": response.data.id,
					"last4": response.data.external_accounts.data[0].last4,
					primary
				});
				specialist.updateDocument( specialist.getDocument().value._id, { account });
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.bank.add.success
				});
				router.push({ "name": "SettingsBilling" });
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.bank.add.error
				});
			}
		};

		return {
			userType,
			wizardSteps,
			accountType,
			form,
			payoutForm,
			plans,
			submitClientBilling,
			selectCountries
		};
	}
};
</script>


<style lang="stylus" scoped>
.onboarding-form
	padding: 2em
	.m-container
		max-width: 30em
	.plan-header
		text-align: center
		margin: 0 auto 2em
		.title
			font-size: 2em
		.subtitle
			color: #797b7e
		.c-button, .c-switcher
			margin: 1em auto 0
section
	+ section
		margin-top: 1.5em
	.header
		font-size: 1.3em
		line-height: 1.2
	.intro
		font-size: 0.9em
		margin-top: 0.3em
		line-height: 1.3
		color: #797b7e
	.inputs
		margin-top: 1em
.c-switcher
	margin: 0 auto 1em
</style>
