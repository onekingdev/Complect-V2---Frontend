<template lang="pug">
card-container
	template(#content v-if="step === 1")
		h1 Let's get you started!
		.form.grid-6
			c-field(label="Email" type="email" :errors="errors.email" v-model="form.email" fullwidth required)
			c-field(label="Password" type="password" @keypress.enter="signIn()" :errors="errors.password" v-model="form.password" fullwidth required)
			c-button(title="Sign In" type="primary" @click="signIn()" fullwidth)
			router-link.forgot-password(:to="{name: 'AuthResetPassword'}") Forgot Password
	template(#content v-if="step === 2")
		h1 Confirm Your Email
		h3 We sent a 6 digit code to {{form.email}}. Please enter it below.
		icon(name="mail")
		.confirmation-code
			input(v-for="i in 6" :key="i" type="number" :ref="el => { if (el) inputs[i-1] = el }" v-model="numbers[i-1]" @keyup="event => keyupHandler(event, i)" @input="event => inputHandler(event, i)" required)
		.error(v-if="errorMessage") {{ errorMessage }}
		c-button(title="Submit" type="primary" @click="submitCode()" fullwidth)
	template(#footer)
		p(v-if="step !== 2") Don't have an account yet?&nbsp;
			router-link.sign-up(:to="{name: 'AuthSignUp'}") Sign Up
		c-button(v-else title="Send new code" type="link" @click="sendNewCode()")
</template>


<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useAuth from "~/core/auth";

import { validates } from "~/core/utils.js";
import { required, email } from "@vuelidate/validators";

export default {
	setup () {
		const router = useRouter();
		const { authentication } = useAuth();
		const form = ref({});
		const errors = ref({});
		const step = ref( 1 );
		const nextStep = () => step.value += 1;
		const rules = {
			"email": { required, email },
			"password": { required }
		};

		const signIn = async () => {
			errors.value = await validates( rules, form.value );
			if ( Object.keys( errors.value ).length ) return;

			try {
				await authentication( form.value );
				sessionStorage.setItem( "email", JSON.stringify( form.value.email ) ); // will be changed to sessionID
			} catch ( error ) {
				if ( error === "Missing OTP" ) return nextStep();
				if ( error.includes( "email" ) ) Object.assign( errors.value, { "email": [error] });
				if ( error.includes( "password" ) ) Object.assign( errors.value, { "password": [error] });
				Object.assign( errors.value, { "password": [error] });
				console.error( error );
			}
		};
		// step 2
		const { verification, newOtp } = useAuth();
		const inputs = ref([]);
		const numbers = ref([]);
		const otp = computed( () => numbers.value.join( "" ) );
		const errorMessage = ref( "" );

		const submitCode = async () => {
			errorMessage.value = "";
			if ( otp.value.length < 6 ) errorMessage.value = "Incomplete code";
			else {
				try {
					await verification( form.value.email, form.value.password, otp.value );
				} catch ( error ) {
					errorMessage.value = "Incorrect code";
				}
			}
		};
		const sendNewCode = async () => {
			await newOtp( form.value.email );
			numbers.value = [];
		};

		const keyupHandler = ( e, index ) => {
			if ( e.keyCode === 8 && e.target.value === "" && inputs.value[index - 2] ) inputs.value[index - 2].focus();
		};

		const inputHandler = ( e, index ) => {
			const [first] = e.target.value;
			e.target.value = first ?? "";
			if ( otp.value.length >= 6 ) inputs.value[index - 1].blur();
			if ( index !== inputs.value.length && first !== undefined ) inputs.value[index].focus();
		};

		return {
			errors,
			form,
			signIn,

			step,
			submitCode,
			sendNewCode,
			keyupHandler,
			inputHandler,
			errorMessage,
			otp,
			inputs,
			numbers
		};
	}
};
</script>

<style lang="stylus" scoped>
.forgot-password
	font-size: 0.875em
.forgot-password, .sign-up
	&:hover
		text-decoration: underline

.error
	font-size: 0.8em
	color: red
	text-align: center
svg.icon
	flex: 1
	display: block
	width: 12em
	height: 8em
	margin: 2em auto
.confirmation-code
	margin: 1em
	display: flex
	gap: 0.5em
	font-size: 1.6em
	input
		flex: 1 1 0
		width: 0
		min-width: 0
		padding: 1em 0
		text-align: center
		border: 1px solid var(--c-border)
		border-radius: var(--v-border-radius)
		&:focus
			border-color: var(--c-selected)
</style>
