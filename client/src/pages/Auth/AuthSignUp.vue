<template lang="pug">
c-card
	//- template(#content)
		c-form-wizard(title="Let's get you started!" :step="currentStep")
			template(#step1)
				c-radio-cards(id="user-type" :options="accountTypes" v-model="user.type")
				c-button(title="Next" type="primary" fullwidth :disabled="user.type ? false:true" @click="nextStep()")

			template(#step2)
				form.form-container
					c-field(label="First Name:" v-model="user.first_name" required)
					c-field(label="Last Name:" v-model="user.last_name" required)
					c-field(label="Email:" v-model="user.email" required)
					c-field(label="Password:" v-model="user.password" required)
					c-field(label="Repeat Password:" v-model="password2" required)
				p By signing up, I accept the Complect Terms of Use and acknowledge the Privacy Policy
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
			"first_name": "",
			"last_name": "",
			"email": "",
			"password": ""
		});
		const accountTypes = [
			{
				"key": "business",
				"title": "I am a business",
				"icon": "business",
				"description": "Looking to effectively manage my compliance program and find expertise"
			}, {
				"key": "specialist",
				"title": "I am a specialist",
				"icon": "briefcase",
				"description": "Looking to work with potential clients on compliance projects"
			}
		];
		const password2 = ref( null );

		const currentStep = ref( 1 );
		const prevStep = () => currentStep.value--;
		const nextStep = () => currentStep.value++;

		return {
			user,
			accountTypes,
			password2,
			currentStep,
			prevStep,
			nextStep
		};
	}
};
</script>


<style lang="stylus" scoped>
</style>
