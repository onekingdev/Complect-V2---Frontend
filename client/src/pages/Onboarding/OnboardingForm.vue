<template lang="pug">
.onboarding-form
	card-container(title="Set Up Your Account")
		template(#content)
			//- Business
			c-form-wizard(v-if="userType === 'business'" :steps="wizardSteps.business")
				template(#step1)
					section
						.header Do you have a CRD number?
						.intro The CRD number will be used to auto-populate information about your business
						.inputs
							c-radios(id="crd" :data="radioOptions" v-model="form.crd")
				template(#step2)
					c-field(label="Company Name" type="text" placeholder="Company Name" required v-model="form.company")
					c-field.col-3(label="AUM" type="text" placeholder="AUM" v-model="form.aum")
					c-field.col-3(label="Number of Accounts" type="number" placeholder="Number of Accounts" v-model="form.accounts")
					c-select.col-3(label="Industry" placeholder="Select Industry" :data="industries" v-model="form.industries" searchable multiple required)
					c-select.col-3(label="Sub-Industry" placeholder="Select Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustries" searchable multiple)
					c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :data="jurisdictions" v-model="form.jurisdictions" searchable multiple required)
					c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :data="timezones" v-model="form.timezone" searchable required)
					c-field.col-3(label="Phone Number" type="tel" placeholder="Phone Number" v-model="form.tel")
					c-field.col-3(label="Company Website" type="url" placeholder="Company Website" v-model="form.website")
					.divider
					c-field.col-3(label="Business Address" type="address" placeholder="Business Address" v-model="form.address" required)
					c-field.col-3(label="Apt/Unit" type="text" placeholder="Apt/Unit" v-model="form.apt")
					c-field.col-3(label="City" type="text" placeholder="City" v-model="form.city")
					c-field.col-3(label="State" type="text" placeholder="State" v-model="form.state")
					c-field.col-3(label="Zip code" type="number" placeholder="Zip code" v-model="form.zip")
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
							c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :data="jurisdictions" v-model="form.jurisdictions" searchable multiple required)
							c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :data="timezones" v-model="form.timezone" searchable required)
					section
						.header What industries do you serve?
						.inputs.grid-6
							c-select.col-3(label="Industry" placeholder="Select Industry" :data="industries" v-model="form.industries" searchable multiple required)
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
							c-field(label="Enter your hourly rate" type="number" placeholder="Hourly rate" v-model="form.rate")
					section
						.header What's your experience?
						.itro Select one that best matches your level of your expertise.
						.inputs
							c-radio-cards(id="experience" :data="formOptions.experience" v-model="form.experience")
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
import { computed } from "vue";
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

import { industries, subIndustries, jurisdictions, timezones } from "~/data/static.js";
import { plans } from "~/data/plans.js";

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

		const wizardSteps = {
			"business": [
				{ "title": "CRD Number" }, { "title": "Company Information" }, { "title": "Choose Plan" }
			],
			"specialist": [
				{ "title": "Background" }, { "title": "Skills and education" }, { "title": "Choose plan" }
			]
		};


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

		const goToCheckout = () => router.push({ "name": "OnboardingCheckout" });

		const filteredSubIndustries = computed( () => {
			// return subindustriesBusiness.map(sub => sub.value > 1 && sub.value < 2)

			const sub = [];
			if ( !form.value.industries ) return sub;
			form.value.industries.forEach( industry => {
				subIndustries[userType].forEach( subInd => {
					if ( subInd.value >= industry && subInd.value < industry + 1 ) sub.push( subInd );
				});
			});
			return sub;
		});

		return {
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
			goToCheckout
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
