<template lang="pug">
.onboarding-form.medium-card
	card-container(title="Set Up Your Account")
		template(#content)
			//- Business
			c-form-wizard(v-if="userType === 'business'" :steps="wizardSteps.business")
				template(#step1)
					section
						.header.crd-header Do you have a CRD number?
							.crd-info
								.tooltip You can find your CRD number on the&nbsp
									router-link(to="https://adviserinfo.sec.gov" target="_blank") IAPD site
								icon(name="info-black" size="small")
						.intro The CRD number will be used to auto-populate information about your business
						.inputs.grid-6
							c-radios.crd-radio(id="crd" :data="radioOptions" v-model="form.crd")
							c-field.col-3(id="crdValue" label="What is your CRD number?" placeholder="123456" v-if="form.crd" v-model="form.crdValue")
				template(#step2)
					c-field(label="Company Name" type="text" placeholder="Company Name" :errors="errors.company" required v-model="form.company")
					c-field.col-3(label="AUM" type="text" placeholder="AUM" v-model="form.aum")
					c-field.col-3(label="Number of Accounts" type="number" placeholder="Number of Accounts" v-model="form.accounts")
					c-select.col-3(label="Industry" placeholder="Select Industry" :errors="errors.industries" :data="industries" v-model="form.industries" searchable multiple required)
					c-select.col-3(label="Sub-Industry" placeholder="Select Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustries" searchable multiple)
					c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :errors="errors.jurisdictions" :data="jurisdictions" v-model="form.jurisdictions" searchable multiple required)
					c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :errors="errors.timezone" :data="timezones" v-model="form.timezone" searchable required)
					c-field.col-3(label="Phone Number" type="tel" placeholder="Phone Number" v-model="form.tel")
					c-field.col-3(label="Company Website" type="url" placeholder="Company Website" v-model="form.website")
					.divider
					c-address.business-col.col-5(label="Business Address" :errors="errors.address" :value="form.address" placeholder="Business Address" @update="updateAddressChange" required)
					c-field.apt-col.col-1(label="Apt/Unit" type="text" placeholder="Apt/Unit" v-model="form.apt")
					c-field.city-col.col-2(label="City" type="text" placeholder="City" :errors="errors.city" v-model="form.city" required)
					c-field.state-col.col-2(label="State" type="text" placeholder="State" :errors="errors.state" v-model="form.state")
					c-field.zip-col.col-2(label="Zip code" type="number" placeholder="Zip code" :errors="errors.zip" v-model="form.zip" required)
				template(#step3)
					.plan-header
						.title Choose your plan
						c-switcher(id="payment" :options="formOptions.payments" v-model="form.annually" type="primary" fullwidth)
					c-plans(:plans="plans[userType]" :annually="form.annually" v-model="form.plan" @checkout="goToCheckout()")

			//- Specialist
			c-form-wizard(v-else :steps="wizardSteps.specialist")
				template(#step1)
					section
						.header What jurisdiction does your expertise extend to?
						.intro Providing your jurisdiction(s) will help find clients within your domain of expertise. Select all that apply.
						.inputs.grid-6
							c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :errors="errors.jurisdictions" :data="jurisdictions" v-model="form.jurisdictions" searchable multiple required)
							c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :errors="errors.timezone" :data="timezones" v-model="form.timezone" searchable required)
					section
						.header What industries do you serve?
						.inputs.grid-6
							c-select.col-3(label="Industry" placeholder="Select Industry" :errors="errors.industries" :data="industries" v-model="form.industries" searchable multiple required)
							c-select.col-3(label="Sub-Industry" placeholder="Select Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustries" searchable multiple)
					section
						.header Are you a former regulator?
						.inputs
							c-radios(id="regulator" :data="radioOptions" v-model="form.regulator")
				template(#step2)
					section
						.header Tell us more about yourself:
						.intro Enter any relevant skills to better match you with suitable projects.
						.inputs
							c-select(label="Skills" placeholder="Select Skills" :data="formOptions.skills" v-model="form.skills" searchable multiple)
					section
						.header My Rate
						.inputs
							c-field(label="Enter your hourly rate" type="number" placeholder="Hourly rate" :errors="errors.rate" v-model="form.rate")
					section
						.header Whats your experience?
						.itro Select one that best matches your level of your expertise.
						.inputs
							c-radio-cards(id="experience" :data="formOptions.experience" :errors="errors.experience" v-model="form.experience")
					section
						.header Upload your resume:
						c-dropzone
				template(#step3)
					.plan-header
						.title Choose your Membership Plan
						.subtitle Want to skip selecting a plan?
						c-button(title="Continue With Free Plan" type="plan" @click="goToCheckout()")
					c-plans(:type="userType" :plans="plans[userType]" :annually="true" v-model="form.plan" @checkout="goToCheckout()")
</template>


<script>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
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

// import { manualApi } from "~/core/api.js";
import UseData from "~/store/Data.js";
import useAuth from "~/core/auth.js";
import cAddress from "~/components/Inputs/cAddress.vue";

import { industries, jurisdictions, timezones } from "~/data/static.js";
import { plans } from "~/data/plans.js";

import { filterSubIndustries, validates } from "~/core/utils.js";
import { required, requiredUnless } from "@vuelidate/validators";
import { requireForArray, numberGreaterThanZero } from "~/core/customValidates.js";

const radioOptions = [
	{ "title": "No", "value": false }, { "title": "Yes", "value": true }
];

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

export default {
	"components": {
		cFormWizard,
		cRadios,
		cAddress,
		cRadioCards,
		cSelect,
		cDropzone,
		cSwitcher,
		cPlans
	},
	// eslint-disable-next-line max-lines-per-function
	setup () {
		const router = useRouter();
		const { profile } = useProfile();
		const userType = profile.value.type;
		const { form, resetForm } = useForm( "onboarding", baseForm[userType]);
		const errors = ref({});
		const { onboarding } = useAuth();
		const potentials = new UseData( "potential_businesses" );

		const validateInfor = computed( () => ({
			"specialist": {
				"1": {
					"rules": {
						"jurisdictions": { "required": requireForArray },
						"industries": { "required": requireForArray },
						"timezone": { "required": requireForArray }
					},
					"data": {
						"jurisdictions": form.value.jurisdictions,
						"timezone": form.value.timezone,
						"industries": form.value.industries
					}
				},
				"2": {
					"rules": {
						"rate": { "validateRate": numberGreaterThanZero },
						"experience": { "required": requiredUnless( form.value.experience >= 0 ) }
					},
					"data": {
						"rate": form.value.rate,
						"timezone": form.value.experience
					}
				}
			},
			"business": {
				"2": {
					"rules": {
						"company": { required },
						"industries": { "required": requireForArray },
						"jurisdictions": { "required": requireForArray },
						"timezone": { "required": requireForArray },
						"address": { required },
						"city": { required },
						"zip": { required }
					},
					"data": {
						"company": form.value.company,
						"industries": form.value.industries,
						"jurisdictions": form.value.jurisdictions,
						"timezone": form.value.timezone,
						"address": form.value.address,
						"city": form.value.city,
						"zip": form.value.zip
					}
				}
			}
		}) );

		const stepValidate = async currentStep => {
			const step = validateInfor.value[userType][currentStep];
			errors.value = await validates( step.rules, step.data );
			return Object.keys( errors.value ).length === 0;
		};

		const wizardSteps = {
			"business": [
				{ "title": "CRD Number" }, { "title": "Company Information", "validates": stepValidate }, { "title": "Choose Plan" }
			],
			"specialist": [
				{ "title": "Background", "validates": stepValidate }, { "title": "Skills and education", "validates": stepValidate }, { "title": "Choose plan" }
			]
		};

		const goToCheckout = async () => {
			try {
				if ( userType === "business" && form.value.plan === "starter" ) {
					const business = new UseData( "business" );
					const ids = await business.createDocuments([form.value]);
					// eslint-disable-next-line require-atomic-updates
					form.value.businessId = ids[0];
					await onboarding( form.value );
					profile.value.new = false;
					await resetForm();
					router.push({ "name": "Dashboard" });
				} else if ( userType === "specialist" && form.value.plan === "standard" ) {
					const specialist = new UseData( "specialist" );
					const ids = await specialist.createDocuments([form.value]);
					// eslint-disable-next-line require-atomic-updates
					form.value.specialistId = ids[0];
					await onboarding( form.value );
					profile.value.new = false;
					await resetForm();
					router.push({ "name": "Dashboard" });
				} else {
					form.value.email = profile.value.email;
					// eslint-disable-next-line max-depth
					if ( userType === "specialist" ) form.value.company = `${profile.value.firstName} ${profile.value.lastName}`;
					router.push({ "name": "OnboardingCheckout" });
				}
			} catch ( error ) {
				console.error( error );
			}
		};

		const updateAddressChange = data => {
			const { address, city, state, zip } = data;
			form.value.address = address;
			if ( city ) form.value.city = city;
			if ( state ) form.value.state = state;
			if ( zip ) form.value.zip = zip;
		};

		const filteredSubIndustries = computed( () => filterSubIndustries( form.value.industries, userType ) );

		const resetValues = () => {
			form.value.company = "";
			form.value.website = "";
			form.value.aum = "";
			form.value.accounts = "";
			form.value.tel = "";
			form.value.address = "";
			form.value.apt = "";
			form.value.city = "";
			form.value.state = "";
			form.value.zip = "";
		};

		onMounted( () => potentials.readDocuments() );
		onUnmounted( () => potentials.clearStore() );

		watch( () => form.value.crdValue, () => {
			if ( !form.value.crdValue ) return;
			const crdValues = potentials.getDocuments().value.find( doc => doc.crd_number === form.value.crdValue );
			resetValues();
			if ( !crdValues ) return;
			form.value.company = crdValues.business_name;
			form.value.website = crdValues.website;
			form.value.aum = crdValues.aum;
			form.value.accounts = crdValues.client_account_cnt;
			form.value.tel = crdValues.contact_phone;
			form.value.address = crdValues.address_1;
			form.value.apt = crdValues.apartment;
			form.value.city = crdValues.city;
			form.value.state = crdValues.state;
			form.value.zip = crdValues.zipcode;
		}, { "deep": true });

		return {
			errors,
			userType,
			radioOptions,
			wizardSteps,
			form,
			formOptions,
			industries,
			filteredSubIndustries,
			jurisdictions,
			timezones,
			plans,
			goToCheckout,
			updateAddressChange
		};
	}
};
</script>


<style lang="stylus" scoped>
.onboarding-form
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
	.crd-header
		display: flex
		align-items: center
		gap: 0.5em
		.crd-info
			display: flex
			align-items: center
			position: relative
			.tooltip
				visibility: hidden
				width: 17em
				background: var(--c-tooltip-bgColor)
				text-align: center
				padding: 0.34em 0.68em
				color: var(--c-tooltip-color)
				position: absolute
				bottom: 140%
				left: -7.8em
				opacity: 0
				transition: opacity 0.3s
				font-size: 0.577em
				border-radius: 0.3em
				box-shadow: 0 1rem 1rem -0.5rem rgba(0, 0, 0, 0.35)
				&:after
					content: ""
					position: absolute
					top: 100%
					left: 50%
					margin-left: -5px
					border-width: 5px
					border-style: solid
					border-color: var(--c-tooltip-bgColor) transparent transparent transparent
			&:hover .tooltip
				visibility: visible
				opacity: 1
	.intro
		font-size: 0.9em
		margin-top: 0.3em
		line-height: 1.3
		color: #797b7e
	.inputs
		margin-top: 1em
	.crd-radio
		font-size: 0.875em
.c-switcher
	margin: 0 auto 1em
.c-form-wizard
	@media (max-width: 1000px)
		.business-col
			grid-column: 1 / -1
		.apt-col
			grid-column: span 3
		.city-col
			grid-column: span 3
		.state-col
			grid-column: span 3
		.zip-col
			grid-column: span 3

</style>
