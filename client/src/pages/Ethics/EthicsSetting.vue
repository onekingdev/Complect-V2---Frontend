<template lang="pug">
card-container(title="Settings")
	template(#content)
		.item
			.title Reviewers
			.sub-title Select who gets to approve each form.
			.item-field
				c-select(label="Reviewers(s)" :data="reviewerValues" v-model="reviewerValue" searchable multiple fullwidth required)
				span.hint All admin roles are automatically selected as reviewers.
		.item
			.title Respondent
			.sub-title Select who gets to view each form.
			.item-field
				c-select(label="Respondents" :data="respondentValues" v-model="respondentValue" searchable multiple fullwidth required)
				span.hint All users are automatically selected as reviewers.
</template>

<script>
import { ref } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
export default {
	"components": { cSelect },
	setup () {
		// attestation Form Setting
		const reviewerValues = [
			{ "title": "Option 1", "value": "option-1" },
			{ "title": "Option 2", "value": "option-2" },
			{ "title": "Option 3", "value": "option-3" },
			{ "title": "Option 4", "value": "option-4" },
			{ "title": "Option 5", "value": "option-5" },
			{ "title": "Option 6", "value": "option-6" },
			{ "title": "Option 7", "value": "option-7" },
			{ "title": "Option 8", "value": "option-8" },
			{ "title": "Option 9", "value": "option-9" },
			{ "title": "Option 10", "value": "option-10" }
		];
		const reviewerValue = ref([
			"option-1", "option-2", "option-3"
		]);
		const respondentValues = [
			{ "title": "All Users", "value": "all" }, { "title": "User 1", "value": "user-1" }, { "title": "User 2", "value": "user-2" }
		];
		const respondentValue = ref(["all"]);
		return {
			reviewerValues,
			reviewerValue,
			respondentValues,
			respondentValue
		};
	}
};
</script>

<style lang="stylus" scoped>
.card-container
	width: 45em
	margin: auto
	:deep(.card-header)
		border-bottom: 1px solid var(--c-border)
		height: 4em
	:deep(.card-content)
		padding: 1.25em
	.item
		border-bottom: 1px solid var(--c-border)
		&:last-child
			border-width: 0
		.item-field
			margin: 1.25em 0
			.hint
				font-size: 0.75em
		.title
			color: #000
		.sub-title
			color: #000
			font-size: 0.875em
</style>
