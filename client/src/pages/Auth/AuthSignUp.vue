<template lang="pug">
c-card
	template(#content)
		c-form-wizard
			//- template
			h1 Let's get you started!
			h2 Select your account type
			.types-container
				.type-card.selected
					.type-title I am a business
					icon.type-icon(name="business")
					.type-description Looking to effectively manage my compliance program and find expertise
				.type-card
					.type-title I am a specialist
					icon.type-icon(name="briefcase")
					.type-description Looking to work with potential clients on compliance projects
			c-button(title="Next" type="primary" fullwidth)
	template(#footer)
		p Already have a Complect account? 
			router-link(:to="{name: 'AuthSignIn'}")  Sign In
</template>


<script>
import { reactive } from "vue"
import cFormWizard from "~/components/Misc/cFormWizard.vue"
export default {
	components: { cFormWizard },
	setup() {
		const data = reactive({
			type: "",
			first_name: "",
			last_name: "",
			email: "",
			password: ""
		})

		return { data }
	}
};
</script>


<style lang="stylus" scoped>
.types-container
	display: flex
	margin: 2em 0
	gap: 1em
	.type-card
		padding: 2em 1em
		display: flex
		flex: 1 0 0
		flex-direction: column
		justify-content: flex-start
		border: 1px solid var(--c-border)
		border-radius: var(--v-border-radius)
		transition: background var(--fx-duration-short), border-color var(--fx-duration-short)
		cursor: pointer
		.type-title
			font-weight: bold
			text-align: center
			color: var(--c-text)
		.type-icon
			margin: 1em auto
			width: 3em
			height: 3em
			fill: var(--c-text)
		.type-description
			text-align: center
			color: var(--c-dimmed)
			font-size: 0.9em
			line-height: 1.4
		&:hover
			background: #fafafa
		&.selected
			border-color: var(--c-headers)
			background: #fafafa
			.type-title
				color: var(--c-headers)
			.type-icon
				fill: var(--c-headers)
</style>
