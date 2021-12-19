<template lang="pug">
c-card
	template(#content)
		div.step-one(v-if="currentStep === 1")
			h2.heading.large Let's get you started!
			h4.heading.medium Select your account type
			c-radio-cards.account-types(id="user-type" :data="accountTypes" :alignCenter="true" v-model="user.type")
			c-button(title="Next" type="primary" @click="nextStep" fullwidth)
		div.step-two(v-if="currentStep === 2")
			h2.heading.large Let's get you started!
			h4.heading.medium Create your FREE account
			div.signup-form
				div.field.grid-6
					c-field.col-3(label="First Name:" v-model="user.firstName" required)
					c-field.col-3(label="Last Name:" v-model="user.lastName" required)
				div.field
					c-field(label="Email:" v-model="user.email" required)
				div.field
					c-field(label="Password:" v-model="user.password" required)
				div.field
					c-field(label="Repeat Password:" v-model="password2" required)
			div.terms
				| By signing up, I accept the
				a(href="/terms-of-use") Complect Terms of Use
				| and acknowledge the
				a(href="/privacy-policy") Privacy Policy
			c-button(title="Sign Up" type="primary" fullwidth)
	template(#footer)
		p Already have a Complect account?
			router-link(:to="{name: 'AuthSignIn'}")  Sign In
</template>


<script>
import { ref, reactive } from "vue";
import cFormWizard from "~/components/FormWizard/cFormWizard.vue";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
export default {
	"components": {
		cFormWizard,
		cRadioCards
	},
	setup () {
		const user = reactive({
			"type": "",
			"firstName": "",
			"lastName": "",
			"email": "",
			"password": ""
		});
		const accountTypes = [
			{
				"key": "business",
				"title": "I am a business",
				"image": "business",
				"description": "Looking to effectively manage my compliance program and find expertise"
			}, {
				"key": "specialist",
				"title": "I am a specialist",
				"image": "briefcase",
				"description": "Looking to work with potential clients on compliance projects"
			}
		];
		const password2 = ref( null );

		const currentStep = ref( 1 );
		// const prevStep = () => currentStep.value -= 1;
		const nextStep = () => currentStep.value += 1;

		return {
			user,
			accountTypes,
			password2,
			currentStep,
			// prevStep,
			nextStep
		};
	}
};
</script>


<style lang="stylus" scoped>
.heading
	text-align: center
	&.large
		font-size: 2em
		font-weight: bold
	&.medium
		font-size: 1.2em
.account-types
	margin: 2em 0
.signup-form
	margin: 1.8em 0 0.8em 0
	.field
		margin: 0.6em 0
.terms
	font-size: 0.9em
	margin-bottom: 1em
</style>
