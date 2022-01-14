<template lang="pug">
.c-form-wizard
	.header(v-if="progress")
		//- .meta(v-if="section || title || subtitle")
			.section(v-if="section") {{section}}
			h1.title(v-if="title") {{title}}
			h2.title(v-if="subtitle") {{subtitle}}
		.progress(v-if="progress")
			.progress-step(v-for="(s, index) in steps" :key="index" :class="[step >= index+1 ? 'passed':'']" )
				.bar
				.name {{index+1}}. {{s.title}}
	.step.grid-6
		keep-alive
			slot(:name="`step${step}`" )
	.controls(v-if="navigation")
		c-button(v-if="!firstStep" title="Go Back" @click="nextStep(-1)")
		c-button(v-if="!lastStep" title="Next" type="primary" @click="nextStep(1)")
		//- c-button(v-if="lastStep" title="Submit" type="primary" @click="nextStep(1)")
</template>


<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
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
		"progress": {
			"type": Boolean,
			"default": true
		},
		"navigation": {
			"type": Boolean,
			"default": true
		}
	},
	"emits": ["update:step"],
	setup ( props ) {
		const router = useRouter();
		const route = useRoute();
		const step = ref( 1 );
		const firstStep = computed( () => step.value === 1 );
		const lastStep = computed( () => step.value === props.steps.length );

		const nextStep = value => {
			if ( firstStep.value && value === -1 || lastStep.value && value === 1 ) return;
			step.value += value;
			router.push({ "query": { "step": step.value } });
		};


		onMounted( () => {
			const routeStep = parseFloat( route.query.step ) || 1;
			step.value = routeStep;
			router.push({ "query": { "step": routeStep } });
		});

		return {
			firstStep,
			lastStep,
			nextStep,
			step
		};
	}
};
</script>

<style lang="stylus" scoped>
.c-form-wizard
	background: var(--c-bg-z2)
	// max-width: 800px
	// min-height: 100%
	// margin: auto
	// padding: 3em 2em
	.header
		margin-bottom: 3em
		.meta
			margin-bottom: 2em
		.progress
			display: flex
			gap: 0.6em
			.progress-step
				flex: 1
				color: var(--c-dimmed-light)
				width: 100%
				line-height: 1.3
				.bar
					width: 100%
					height: 0.4em
					background: transparent
					position: relative
					background: var(--c-border)
					margin-bottom: 0.5em
					&:after
						content: ""
						width: 0
						height: 100%
						position: absolute
						top: 0
						left: 0
						background: var(--c-text)
						transition: 0.2s width
				&.passed
					color: var(--c-text)
					.bar:after
						width: 100%
						background: var(--c-text)

	.controls
		margin-top: auto
		display: flex
		justify-content: flex-end
		gap: 1em
		margin-top: 2em
</style>
