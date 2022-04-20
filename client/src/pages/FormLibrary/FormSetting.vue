<template lang="pug">
card-container(title="Settings")
	template(#content)
		.item
			.title Reviewers
			.sub-title Select who gets to approve each form.
			.item-field
				c-select(label="Reviewers(s)" placeholder="Option 1" :data="reviewerValues" v-model="reviewerValue" searchable multiple fullwidth required)
				span.hint All admin roles are automatically selected as reviewers.
		.item
			.title Frequency
			.sub-title Select how often you want to send this form out.
			.item-field.frequency.grid-6
				c-select.col-3(label="Repeat" :data="repeatValues" v-model="repeatValue" fullwidth)
				c-select.col-3(placeholder="Select frequency" disabled fullwidth)
		.item
			.title Deadline
			.sub-title Select the time period users will have to complete the form.
			.item-field.deadline
				c-field.within(label="Within" v-model="within")
				span.unit Day(s)
		.item
			.title Reminders
			.sub-title Set reminders for incompleted forms.
			.item-field.reminders
				c-field.every(label="Every" v-model="every")
				span.unit Day(s)

</template>

<script>
import { ref } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
export default {
	"components": { cSelect },
	setup () {
		const reviewerValues = [
			{ title: "Option 1", value: "option-1"},
			{ title: "Option 2", value: "option-2"},
			{ title: "Option 3", value: "option-3"},
			{ title: "Option 4", value: "option-4"},
			{ title: "Option 5", value: "option-5"},
			{ title: "Option 6", value: "option-6"},
			{ title: "Option 7", value: "option-7"},
			{ title: "Option 8", value: "option-8"},
			{ title: "Option 9", value: "option-9"},
			{ title: "Option 10", value: "option-10"}
		];
		const repeatValues = [
			{ title: "None", value: "none"},
			{ title: "Monthly", value: "monthly"},
			{ title: "Annually", value: "annually"},
		];
		const reviewerValue = ref([ "option-1", "option-2", "option-3" ]);
		const repeatValue = ref("none");
		const within = ref(30);
		const every = ref(3);
		return { reviewerValues, reviewerValue, repeatValues, repeatValue, within, every };
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
			&.deadline, &.reminders
				display: flex
				align-items: flex-end
				gap: 0.75em
				.unit
					margin-bottom: 0.25em
					font-size: 0.875em
					color: #000
				:deep(.field-body)
					width: 8.875em
			.hint
				font-size: 0.75em
		.frequency
			align-items: flex-end
		.title
			color: #000
		.sub-title
			color: #000
			font-size: 0.875em
</style>
