<template lang="pug">
c-form-wizard(section="Projets" title="Post Job" :steps="wizardSteps")

	template(#step1)
		c-field(label="Job Name" v-model="form.jobName" required)
		c-field.col-3(label="Start Date" type="date" v-model="form.startsAt" required)
		c-field.col-3(label="Due Date" type="date" v-model="form.endsAt" required)
		c-textarea(label="Description" v-model="form.description" required)
		c-textarea(label="Role Details" v-model="form.roleDetails" required)
		c-select(label="Location Type" placeholder="Remote" :data="fieldsOptions.locationType" v-model="form.locationType" required)
		template(v-if="form.locationType !== 'remote'")
			c-select(label="Location" :data="fieldsOptions.location" v-model="form.location" required)
		c-select(label="Industry" :data="fieldsOptions.industries" v-model="form.industries" searchable multiple required)
		c-select(label="Jurisdiction" :data="fieldsOptions.jurisdictions" v-model="form.jurisdictions" searchable multiple required)

	template(#step2)
		c-select(label="Minimum Experience" :data="fieldsOptions.minExperience" v-model="form.minExperience" required)
		c-checkbox(label="Only former regulators" v-model="form.formerRegulators")
		c-select(label="Skills" :data="fieldsOptions.skills" v-model="form.skills" searchable multiple required)

	template(#step3)
		c-radio-cards(:data="fieldsOptions.priceType" v-model="form.priceType")
		template(v-if="form.priceType === 'fixed'")
			c-field(label="Estimated Budget" v-model="form.budget" required)
		template(v-else)
			c-field.col-3(label="Estimated Hourly Rate" v-model="form.hourlyRate" required)
			c-field.col-3(label="Upper Hourly Rate" v-model="form.maxHourlyRate" required)
		c-select(label="Payment Schedule" :data="fieldsOptions.paymentSchedule" v-model.value="form.paymentSchedule" required)


	template(#controls)
		c-button(title="Exit" type="link" @click="closeWizard()")
		c-button(title="Save as Draft" @click="saveDraft()")
</template>


<script>
import { reactive, watch } from "vue";
import { useRouter } from "vue-router";
import cFormWizard from "~/components/FormWizard/cFormWizard.vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
import { industries, jurisdictions } from "~/data/static.js";
export default {
	"components": {
		cFormWizard,
		cCheckbox,
		cSelect,
		cRadioCards
	},
	setup () {
		const router = useRouter();
		const form = reactive({
			"jobName": "",
			"startsAt": Date.now(),
			"endsAt": "",
			"description": "",
			"roleDetails": "",
			"locationType": [],
			"location": "",
			"industries": [],
			"jurisdictions": [],
			"minExperience": "",
			"formerRegulators": false,
			"skills": ["html"],

			"priceType": "fixed",
			"budget": "",
			"hourlyRate": "3",
			"maxHourlyRate": "",
			"paymentSchedule": "50"
		});


		const fieldsOptions = {
			"locationType": [
				{
					"title": "Remote",
					"value": "remote"
				}, {
					"title": "Remote + Travel",
					"value": "travel"
				}, {
					"title": "Onsite",
					"value": "onsite"
				}
			],
			"location": [{
				"title": "USA",
				"value": "usa"
			}],
			industries,
			jurisdictions,
			"minExperience": [
				{
					"title": "Junior",
					"value": "1"
				}, {
					"title": "Intermediate",
					"value": "2"
				}, {
					"title": "Expert",
					"value": "3"
				}
			],
			"skills": [
				{
					"title": "HTML",
					"value": "html"
				}, {
					"title": "CSS",
					"value": "css"
				}, {
					"title": "Vue.js",
					"value": "vue.js"
				}
			],
			"priceType": [
				{
					"title": "Fixed Price",
					"value": "fixed",
					"icon": "tag",
					"description": "Budget-friendly approach for scoped projects."
				}, {
					"title": "Hourly Price",
					"value": "hourly",
					"icon": "time",
					"description": "Pay by the hour. Provides more flexibility."
				}
			],
			"paymentSchedule": [
				{
					"title": "Upfront",
					"value": "upfront"
				}, {
					"title": "50/50",
					"value": "50"
				}, {
					"title": "Upon Completion",
					"value": "uponCompletion"
				}
			]
		};

		const wizardSteps = [
			{ "title": "Job Details" }, { "title": "Expertise" }, { "title": "Budget" }
		];

		const closeWizard = () => router.go( -1 );
		const saveDraft = () => {};
		const postProject = () => {};

		// cleanUp fields if hidden
		watch( () => form.priceType, () => {
			form.budget = "";
			form.hourlyRate = "";
			form.maxHourlyRate = "";
			form.paymentSchedule = "";
		});

		return {
			form,
			fieldsOptions,
			wizardSteps,
			closeWizard,
			saveDraft,
			postProject
		};
	}
};
</script>
