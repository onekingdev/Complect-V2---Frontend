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
				c-field.name-col.col-3(label="First Name" :errors="errors.first_name" v-model="form.first_name" required)
				c-field.name-col.col-3(label="Last Name" :errors="errors.last_name" v-model="form.last_name" required)
				c-field(label="Email" :errors="errors.email" v-model="form.email" required)
				c-field(label="Password" type="password" :errors="errors.password" v-model="form.password" required)
				c-field(label="Repeat Password" type="password" :errors="errors.password2" v-model="password2" required)
			.terms By signing up, I accept the Complect&nbsp;
				a(href="https://www.complect.com/terms-of-use" target="_blank" rel="noopener") Terms of Use&nbsp;
				| and acknowledge the&nbsp;
				a(href="https://www.complect.com/privacy-policy" target="_blank" rel="noopener") Privacy Policy
			c-button(title="Sign Up" type="primary" @click="signUpUser()" fullwidth)
		template(v-if="step === 3")
			h1 Confirm Your Email
			h3 We sent a 6 digit code to {{form.email}}. Please enter it below.
			icon(name="mail")
			.confirmation-code
				input(v-for="i in 6" :key="i" type="number" :ref="el => { if (el) inputs[i-1] = el }" v-model="numbers[i-1]" @keyup="event => keyupHandler(event, i)" @input="event => inputHandler(event, i)" required)
			.error(v-if="errorMessage") {{ errorMessage }}
			c-button(title="Submit" type="primary" @click="submitCode()" fullwidth)
	template(#footer)
		p(v-if="step !== 3") Already have a Complect account?
			router-link.sign-in(:to="{name: 'AuthSignIn'}") Sign In
		c-button(v-else title="Send new code" type="link" @click="sendNewCode()")
</template>


<script>
import { ref, computed } from "vue";
import useAuth from "~/core/auth";
import useForm from "~/store/Form.js";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
import { validates } from "~/core/utils.js";
import { required, maxLength, email as emailValidator, minLength } from "@vuelidate/validators";
import { sameAsWith } from "~/core/customValidates.js";

export default {
	"components": { cRadioCards },
	setup () {
		// steps 1, 2
		const { registration } = useAuth();
		const { form } = useForm( "registration" );
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
			"email": { required, emailValidator },
			"first_name": { required, "maxLength": maxLength( 100 ) },
			"last_name": { required, "maxLength": maxLength( 100 ) },
			"password": { required, "minLength": minLength( 6 ) },
			"password2": { required, "sameAsPassword": sameAsWith( "password" ) }
		};

		const signUpUser = async () => {
			errors.value = await validates( rules, { ...form.value, "password2": password2.value });
			if ( Object.keys( errors.value ).length ) return;

			try {
				await registration({ "user": form.value });
				nextStep( 1 );
			} catch ( error ) {
				// if ( error.includes( "Email" ) ) Object.assign( errors.value, { "email": [error] });
				console.error( error );
			}
		};

		// step 3
		const { verification, newOtp } = useAuth();
		const email = ref( "" );
		const inputs = ref([]);
		const numbers = ref([]);
		const otp = computed( () => numbers.value.join( "" ) );
		const errorMessage = ref( "" );

		const submitCode = async () => {
			errorMessage.value = "";
			if ( otp.value.length < 6 ) errorMessage.value = "Incomplete code";
			else {
				try {
					await verification( form.value.email, password2.value, otp.value );
				} catch ( error ) {
					errorMessage.value = "Incorrect code";
				}
			}
		};
		const sendNewCode = async () => {
			await newOtp( email.value );
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
			password2,
			step,
			nextStep,
			accountTypes,
			signUpUser,
			submitCode,
			sendNewCode,
			keyupHandler,
			inputHandler,
			errorMessage,
			email,
			otp,
			inputs,
			numbers
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
.sign-in
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
