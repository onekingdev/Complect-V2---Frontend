<template lang="pug">
card-container(title="Settings")
	template(#content v-if="document.type === 'attestation'")
		.item
			.title Reviewers
			.sub-title Select who gets to approve each form.
			.item-field
				c-select(label="Reviewers(s)" :data="reviewerValues" v-model="reviewerValue" searchable multiple fullwidth required)
				span.hint All admin roles are automatically selected as reviewers.
		.item
			.title Frequency
			.sub-title Select how often you want to send this form out.
			.item-field.frequency.grid-6
				c-select(label="Repeat" :data="repeatValues" v-model="repeatValue" :class="{'col-3': isRepeatNone, 'col-2': !isRepeatNone}" fullwidth)
				c-select.col-2(v-if="!isRepeatNone" label="Every" :data="everyValues" v-model="everyValue" fullwidth)
				c-select.col-2(v-if="!isRepeatNone" label="On Day" :data="dayValues" v-model="dayValue" fullwidth)
				c-select.col-3(v-if="isRepeatNone" placeholder="Select frequency" disabled fullwidth)
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
	template(#content v-if="document.type === 'logs'")
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
	template(#content v-if="document.type === 'approval'")
		.item
			.title Reviewers
			.sub-title Select who gets to approve each form.
			.item-field
				c-select(label="Reviewers(s)" :data="reviewerValues" v-model="reviewerValue" searchable multiple fullwidth required)
				span.hint All admin roles are automatically selected as reviewers.
</template>

<script>
import { ref, computed } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
export default {
	"components": { cSelect },
	"props": {
		"formDetails": {
			"type": String,
			"required": true
		}
	},
	setup ( props ) {
		const document = ref( props.formDetails );
		// Attestation Form Setting
		const reviewerValues = [
			{ title: "Option 1", value: "option-1" },
			{ title: "Option 2", value: "option-2" },
			{ title: "Option 3", value: "option-3" },
			{ title: "Option 4", value: "option-4" },
			{ title: "Option 5", value: "option-5" },
			{ title: "Option 6", value: "option-6" },
			{ title: "Option 7", value: "option-7" },
			{ title: "Option 8", value: "option-8" },
			{ title: "Option 9", value: "option-9" },
			{ title: "Option 10", value: "option-10" }
		];
		const reviewerValue = ref([ "option-1", "option-2", "option-3" ]);
		const repeatValues = [
			{ title: "None", value: "none" },
			{ title: "Monthly", value: "monthly" },
			{ title: "Annually", value: "annually" }
		];
		const repeatValue = ref( "none" );
		const monthValues = [
			{ title: "1 month", value: 1 },
			{ title: "2 months", value: 2 },
			{ title: "3 months", value: 3 },
			{ title: "6 months", value: 6 }
		];
		const dateValues = [
			{ title: "January", value: 1 },
			{ title: "February", value: 2 },
			{ title: "March", value: 3 },
			{ title: "April", value: 4 },
			{ title: "May", value: 5 },
			{ title: "June", value: 6 },
			{ title: "July", value: 7 },
			{ title: "August", value: 8 },
			{ title: "September", value: 9 },
			{ title: "October", value: 10 },
			{ title: "November", value: 11 },
			{ title: "December", value: 12 }
		];
		const everyValues = computed( () => repeatValue.value === "monthly" ? monthValues : dateValues );
		const everyValue = ref( 1 );
		const dayValues = [
			{ title: "1", value: 1 },
			{ title: "2", value: 2 },
			{ title: "3", value: 3 }
		];
		const dayValue = ref( 1 );
		const within = ref(30);
		const every = ref(3);
		const isRepeatNone = computed( () => repeatValue.value === "none" );
		// Employee Log Setting
		const respondentValues = [
			{ title: "All Users", value: "all" },
			{ title: "User 1", value: "user-1" },
			{ title: "User 2", value: "user-2" }
		];
		const respondentValue = ref([ "all" ]);
		return {
			document,
			reviewerValues,
			reviewerValue,
			repeatValues,
			repeatValue,
			everyValues,
			everyValue,
			dayValues,
			dayValue,
			within,
			every,
			isRepeatNone,
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
