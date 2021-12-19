<template lang="pug">
.c-form-wizard(:class="{ fullWidth }")
	.c-form-wizard-header
		.wizard-meta(v-if="section || title || subtitle")
			.wizard-section(v-if="section") {{section}}
			h1.wizard-title(v-if="title") {{title}}
			h2.wizard-title(v-if="subtitle") {{subtitle}}
		.wizard-progress
			.progress-step(v-for="(step, index) in steps" :key="index" :class="[currentStep >= index+1 ? 'passed':'']") {{index+1}}. {{step.title}}
	.c-form-wizard-step.grid-6
		div(v-for="(step, index) in steps" :key="`step-${index}`" v-show="currentStep === index + 1")
			slot(:name="`step${index + 1}`" )
		//- slot(name="step2")
		//- slot(name="step3")
		//- component(v-for="field in steps[currentStep-1].fields" :is="field.component" v-model="field.model" v-bind="field")
	.c-form-wizard-controls
		c-button(v-if="!firstStep" title="Previous" iconL="chevron-left" @click="nextStep(-1)")
		slot(name="controls")
		c-button(v-if="!lastStep" title="Next" type="primary" iconR="chevron-right" @click="nextStep(1)")
		c-button(v-if="lastStep" title="Submit" type="primary" @click="nextStep(1)")
</template>


<script>
import { ref, computed } from "vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
export default {
	"components": {
		cCheckbox,
		cSelect,
		cRadioCards
	},
	"props": {
		"section": {
			"type": String,
			"default": "",
			"required": false
		},
		"title": {
			"type": String,
			"default": "",
			"required": false
		},
		"subtitle": {
			"type": String,
			"default": "",
			"required": false
		},
		"steps": {
			"type": Array,
			"required": true
		},
		"fullWidth": {
			"type": Boolean,
			"required": false,
			"default": false
		}
	},
	setup ( props ) {
		const currentStep = ref( 1 );

		const firstStep = computed( () => currentStep.value === 1 );
		const lastStep = computed( () => currentStep.value === props.steps.length );

		const nextStep = value => {
			if ( firstStep.value && value === -1 || lastStep.value && value === 1 ) return;
			currentStep.value += value;
		};
		return {
			firstStep,
			lastStep,
			currentStep,
			nextStep
		};
	}
};
</script>

<style lang="stylus" scoped>
.c-form-wizard
	background: var(--c-bg-z2)
	max-width: 800px
	min-height: 100%
	margin: auto
	padding: 3em 2em
	&.fullWidth
		max-width: 100%
	.c-form-wizard-header
		.wizard-meta
			margin-bottom: 2em
		.wizard-progress
			display: flex
			gap: 0.6em
			.progress-step
				flex: 1
				padding-top: 0.5em
				color: var(--c-dimmed-light)
				border-top: 0.4em solid var(--c-border)
				&.passed
					color: var(--c-text)
					border-color: var(--c-text)
.c-form-wizard-step
	margin-top: 2em
	// display: flex
	// flex-direction: column
	// gap: 1em
.c-form-wizard-controls
	display: flex
	justify-content: flex-end
	gap: 1em
	margin-top: 2em
	button:first-child
		margin-right: auto
</style>
