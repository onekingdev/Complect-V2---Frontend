<template lang="pug">
card-container
	template(#content)
		template(v-if="step === 1")
			h1 Let's get you started!
			h2 Select your account type
			c-radio-cards.account-types(id="user-type" :data="accountTypes" :alignCenter="true" v-model="form.type")
			c-button(title="Next" type="primary" @click="nextStep(1)" fullwidth)
		template(v-if="step === 2")
			h1 Let's get you started!
			h2 Create your FREE account
			.form.grid-6
				c-field.name-col.col-3(label="First Name" :errors="errors.firstName" v-model="form.firstName" required)
				c-field.name-col.col-3(label="Last Name" :errors="errors.lastName" v-model="form.lastName" required)
				c-field(label="Email" :errors="errors.email" v-model="form.email" required)
				c-field(label="Password" type="password" :errors="errors.password" v-model="form.password" required)
				c-field(label="Repeat Password" type="password" :errors="errors.password2" v-model="password2" required)
			.terms By signing up, I accept the Complect&nbsp;
				a(href="https://www.complect.com/terms-of-use" target="_blank" rel="noopener") Terms of Use&nbsp;
				| and acknowledge the&nbsp;
				a(href="https://www.complect.com/privacy-policy" target="_blank" rel="noopener") Privacy Policy
			c-button(title="Sign Up" type="primary" @click="signUpUser()" fullwidth)
	template(#footer)
		p Already have a Complect account?&nbsp;
			router-link(:to="{name: 'AuthSignIn'}") Sign In
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "~/core/auth";
import useForm from "~/store/Form.js";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
import { validates } from "~/core/utils.js";
import { required, maxLength, email, minLength } from "@vuelidate/validators";
import { sameAsWith } from "~/core/customValidates.js";

export default {
	"components": { cRadioCards },
	setup () {
		const router = useRouter();
		const { registration } = useAuth();
		const { form, resetForm } = useForm( "registration" );
		const accountTypes = [
			{
				"value": "business",
				"title": "I am a business",
				"image": "business",
				"description": "Looking to effectively manage my compliance program and find expertise"
			}, {
				"value": "specialist",
				"title": "I am a specialist",
				"image": "briefcase",
				"description": "Looking to work with potential clients on compliance projects"
			}
		];
		const errors = ref({});
		const password2 = ref( "" );
		const step = ref( 1 );
		const nextStep = value => step.value += value;

		const rules = {
			"email": { required, email },
			"firstName": { required, "maxLength": maxLength( 100 ) },
			"lastName": { required, "maxLength": maxLength( 100 ) },
			"password": { required, "minLength": minLength( 6 ) },
			"password2": { required, "sameAsPassword": sameAsWith( "password" ) }
		};

		const signUpUser = async () => {
			errors.value = await validates( rules, { ...form.value, "password2": password2.value });
			if ( Object.keys( errors.value ).length ) return;

			try {
				await registration( form.value );
				sessionStorage.setItem( "email", JSON.stringify( form.value.email ) ); // will be changed to sessionID
				router.push({ "name": "AuthVerification" });
				await resetForm();
			} catch ( error ) {
				if ( error.includes( "Email" ) ) Object.assign( errors.value, { "email": [error] });
				console.error( error );
			}
		};

		return {
			errors,
			form,
			password2,
			step,
			nextStep,
			accountTypes,
			signUpUser
		};
	}
};
</script>


<style lang="stylus" scoped>
.account-types
	margin: 1em 0
.terms
	font-size: 0.875em
.name-col
	@media (max-width: 767px)
		grid-column: 1 / -1

</style>
