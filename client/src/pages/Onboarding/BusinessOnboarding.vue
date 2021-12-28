<template lang="pug">
div.onboarding
  c-card(title="Set Up Your Account")
    template(#content)
      c-form-wizard(:steps="wizardSteps" :fullWidth="true")
        template(#step1)
          div.heading
            | Do you have a CRD number?
            icon.icon(name="info" size="small")
          div.sub-heading The CRD number will be used to auto-populate information about your business
          div.crdOptions
            c-radios(id="crd-number" :data="crdNumberOptions" v-model="onboardingForm.stepOne.hasCrdNumber")
          div.crdInput(v-if="showCrdInput")
            p What is your CRD number?
            c-field.crd-number(type="text" placeholder="Enter your CRD number")
        template(#step2)
          div.heading Tell us more about your business
          div.field.company-name
            c-field(label="Company Name" type="text" placeholder="Company Name" required)
          div.field.grid-6
            c-field.col-3(label="AUM" type="text" placeholder="AUM")
            c-field.col-3(label="Number of Accounts" type="text" placeholder="Number of Accounts")
          div.field.grid-6
            c-field.col-3(label="Industry" type="text" placeholder="Industry" required)
            c-field.col-3(label="Sub-Industry" type="text" placeholder="Sub-Industry")
          div.field.grid-6
            c-field.col-3(label="Jurisdiction" type="text" placeholder="Jurisdiction" required)
            c-field.col-3(label="Time Zone" type="text" placeholder="Time Zone" required)
          div.field.grid-6
            c-field.col-3(label="Phone Number" type="text" placeholder="Phone Number")
            c-field.col-3(label="Company Website" type="text" placeholder="Company Website")
          div.divider
          div.field.grid-6
            c-field.col-5(label="Business Address" type="text" placeholder="Business Address" required)
            c-field.col-1(label="Apt/Unit:" type="text" placeholder="Apt/Unit")
          div.field.grid-6
            c-field.col-2(label="City" type="text" placeholder="City" required)
            c-field.col-2(label="State" type="text" placeholder="State" required)
            c-field.col-2(label="Zip" type="text" placeholder="Zip" required)
        template(#step3)
          h3.heading.big Choose your plan
          div.switchPlan
            c-switcher(id="button-types" :options="optionsPlan.types" v-model="onboardingForm.stepThree.plan" type="primary" fullwidth)
          div.plans
            div.plans-item(v-for="(item, index) in businessPlans" :key="index" )
              plan-card(:plan="item" :type="item.colorType")
</template>
<script>
import { reactive, computed } from "vue";
import cFormWizard from "~/components/FormWizard/cFormWizard.vue";
import cRadios from "~/components/Inputs/cRadios.vue";
import PlanCard from "~/pages/Onboarding/components/PlanCard.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
export default {
	"components": {
		cFormWizard,
		cRadios,
		PlanCard,
		cSwitcher
	},
	setup () {
		const wizardSteps = [
			{ "title": "CRD Number" }, { "title": "Company Information" }, { "title": "Choose Plan" }
		];

		const onboardingForm = reactive({
			"stepOne": { "hasCrdNumber": false },
			"stepTwo": {},
			"stepThree": { "plan": "annually" }
		});
		const crdNumberOptions = [
			{ "title": "No", "value": false }, { "title": "Yes", "value": true }
		];
		const showCrdInput = computed( () => onboardingForm.stepOne.hasCrdNumber === "yes" );
		const monthPlanChoice = computed( () => onboardingForm.stepThree.plan === "monthly" );
		const yearlyPlanChoice = computed( () => onboardingForm.stepThree.plan === "annually" );
		const businessPlans = computed( () => {
			const yearlyChoose = yearlyPlanChoice.value;
			return [
				{
					"name": "Starter",
					"shortIntroduce": "Try out our product for free!",
					"price": 0,
					"costText": "FREE",
					"userNumberText": "1 admin user",
					"yearCostText": "",
					"benefits": [
						"Compliance Calendar", "Project Management"
					],
					"colorType": "primary"
				}, {
					"name": "Team",
					"shortIntroduce": "Small teams and startups",
					"price": 0,
					"costText": yearlyChoose ? "$125/mo" : "$150/mo",
					"discountText": yearlyChoose ? "$150/mo" : "",
					"userNumberText": yearlyChoose ? "3 free users plus $120/year per person" : "3 free users plus $15/mo per person",
					"yearCostText": yearlyChoose ? "$1500/year" : "",
					"benefits": [
						"Compliance Calendar",
						"Project Management",
						"Policies and Procedures",
						"<b>1</b> Internal Review per year",
						"Exam Management",
						"<b>5GB</b> storage for books and records"
					],
					"colorType": "medium"
				}, {
					"name": "Business",
					"shortIntroduce": "Medium-sized organizations",
					"price": 0,
					"costText": yearlyChoose ? "$210/mo" : "$250/mo",
					"discountText": yearlyChoose ? "$210/mo" : "",
					"userNumberText": yearlyChoose ? "10 free users plus $120/year per person" : "10 free users plus $15/mo per person",
					"yearCostText": yearlyChoose ? "$2520/year" : "",
					"benefits": [
						"Compliance Calendar",
						"Project Management",
						"Policies and Procedures",
						"<b>Unlimited</b> Internal Reviews",
						"Exam Management",
						"Auditor Portal",
						"<b>10GB</b> storage for books and records",
						"<b>Free</b> personalized onboarding"
					]
				}
			];
		});

		const optionsPlan = {
			"types": [
				{
					"title": "Billed Annually",
					"value": "annually"
				}, {
					"title": "Billed Monthly",
					"value": "monthly"
				}
			]
		};

		return {
			onboardingForm,
			wizardSteps,
			optionsPlan,
			crdNumberOptions,
			showCrdInput,
			monthPlanChoice,
			yearlyPlanChoice,
			businessPlans
		};
	}
};
</script>

<style lang="stylus" scoped>
.onboarding
  padding: 2em 4em
  @media screen and (max-width: 520px)
    padding: 0
  .heading
    font-size: 1.2em
    color: var(--c-text)
    &.big
      font-size: 1.6em
      text-align: center
    .icon
      margin-left: 0.5em
  .sub-heading
    font-size: 0.9em
    color: var(--c-dimmed)
    margin-bottom: 1em
  .crdOptions
    padding-left: 0.4em
  .crdInput
    margin-left: 1.5em
    .crd-number
      margin-top: 0.5em
      display: block
      max-width: 70%
  .field
    margin-bottom: 1em
    &.company-name
      width: 50%
      padding-right: 0.6em
      margin-top: 1.7em
  .switchPlan
    width: 300px
    margin: 1.5em auto
  .plans
    display: grid;
    grid-auto-columns: 1fr
    grid-auto-flow: column
    padding-top: 1em
    &-item
      border: solid 1px var(--c-border)
      box-sizing: border-box
      margin-right: 1em
      border-bottom-right-radius: 4px
      border-bottom-left-radius: 4px
      @media screen and (max-width: 720px)
        margin: 2em 0 !important
      &:first-child
        margin-left: -1em
        margin-right: 2em
      &:last-child
        margin-left: 1em
        margin-right: 0
</style>
