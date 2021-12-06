<template lang="pug">
//- pre {{form}}
c-form-wizard(section="Projets" title="Post Job" :steps="wizardSteps")

	template(#step1)
		c-field(label="Job Name" v-model="form.job_name" required)
		c-field.col-3(label="Start Date" type="date" v-model="form.starts_at" required)
		c-field.col-3(label="Due Date" type="date" v-model="form.ends_at" required)
		c-textarea(label="Description" v-model="form.description" required)
		c-textarea(label="Role Details" v-model="form.role_details" required)
		c-select(label="Location Type" placeholder="Remote" :data="fieldsOptions.location_type" v-model="form.location_type" required)
		template(v-if="form.location_type !== 'remote'")
			c-select(label="Location" :data="fieldsOptions.location" v-model="form.location" required)
		c-select(label="Industry" :data="fieldsOptions.industries" v-model="form.industries" searchable multiple required)
		c-select(label="Jurisdiction" :data="fieldsOptions.jurisdictions" v-model="form.jurisdictions" searchable multiple required)

	template(#step2)
		c-select(label="Minimum Experience" :data="fieldsOptions.min_experience" v-model="form.min_experience" required)
		c-checkbox(label="Only former regulators" v-model="form.former_regulators")
		c-select(label="Skills" :data="fieldsOptions.skills" v-model="form.skills" searchable multiple required)

	template(#step3)
		c-radio-cards(:data="fieldsOptions.price_type" v-model="form.price_type")
		template(v-if="form.price_type === 'fixed'")
			c-field(label="Estimated Budget" v-model="form.budget" required)
		template(v-else)
			c-field.col-3(label="Estimated Hourly Rate" v-model="form.hourly_rate" required)
			c-field.col-3(label="Upper Hourly Rate" v-model="form.max_hourly_rate" required)
		c-select(label="Payment Schedule" :data="fieldsOptions.payment_schedule" v-model.value="form.payment_schedule" required)


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
			"job_name": "",
			"starts_at": Date.now(),
			"ends_at": "",
			"description": "",
			"role_details": "",
			"location_type": [
			],
			"location": "",
			"industries": [
			],
			"jurisdictions": [
			],
			"min_experience": "",
			"former_regulators": false,
			"skills": [
				"html"
			],

			"price_type": "fixed",
			"budget": "",
			"hourly_rate": "3",
			"max_hourly_rate": "",
			"payment_schedule": "50"
		});


		const fieldsOptions = {
			"location_type": [
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
			"location": [
				{
					"title": "USA",
					"value": "usa"
				}
			],
			industries,
			jurisdictions,
			"min_experience": [
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
			"price_type": [
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
			"payment_schedule": [
				{
					"title": "Upfront",
					"value": "upfront"
				}, {
					"title": "50/50",
					"value": "50"
				}, {
					"title": "Upon Completion",
					"value": "upon_completion"
				}
			]
		};

		const wizardSteps = [
			{ "title": "Job Details" }, { "title": "Expertise" }, { "title": "Budget" }
		];

		const closeWizard = () => router.go( -1 );
		const saveDraft = () => console.log( "Save as Draft" );
		const postProject = () => console.log( "Post Project" );

		// cleanUp fields if hidden
		watch( () => form.price_type, () => {
			form.budget = form.hourly_rate = form.max_hourly_rate = form.payment_schedule = "";
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
