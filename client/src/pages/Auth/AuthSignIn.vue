<template lang="pug">
card-container
	template(#content)
		h1 Let's get you started!
		.form.grid-6
			c-field(label="Email" type="email" :errors="errors.email" v-model="form.email" fullwidth required)
			c-field(label="Password" type="password" @keypress.enter="signIn()" :errors="errors.password" v-model="form.password" fullwidth required)
			c-button(title="Sign In" type="primary" @click="signIn()" fullwidth)
			router-link.forgot-password(:to="{name: 'AuthResetPassword'}") Forgot Password
	template(#footer)
		p Don't have an account yet?&nbsp;
			router-link(:to="{name: 'AuthSignUp'}") Sign Up
</template>


<script>
import { ref } from "vue";
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
				router.push({ "name": "AuthVerification" });
			} catch ( error ) {
				if ( error.includes( "email" ) ) Object.assign( errors.value, { "email": [error] });
				if ( error.includes( "password" ) ) Object.assign( errors.value, { "password": [error] });
				console.error( error );
			}
		};

		return {
			errors,
			form,
			signIn
		};
	}
};
</script>

<style lang="stylus" scoped>
.forgot-password
	font-size: 0.875em
</style>
