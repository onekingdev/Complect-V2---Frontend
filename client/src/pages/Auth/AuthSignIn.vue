<template lang="pug">
c-card
	template(#content)
		h1 Let's get you started!
		.form.grid-6
			c-field(label="Email" type="email" v-model="form.email" fullwidth required)
			c-field(label="Password" type="password" v-model="form.password" fullwidth required)
			c-button(title="Sign In" type="primary" @click="signIn()" fullwidth)
			c-button(title="Forgot Password" type="link" @click="toResetPassword()" fullwidth)
	template(#footer)
		p Don't have an account yet?&nbsp;
			router-link(:to="{name: 'AuthSignUp'}") Sign Up
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "~/core/auth";

export default {
	setup () {
		const router = useRouter();
		const { authentication } = useAuth();
		const form = ref({});
		const signIn = async () => {
			try {
				await authentication( form.value );
				sessionStorage.setItem( "email", JSON.stringify( form.value.email ) ); // will be changed to sessionID
				router.push({ "name": "AuthVerification" });
			} catch ( error ) {
				console.error( error );
			}
		};


		const toResetPassword = () => router.push({ "name": "AuthResetPassword" });

		return {
			form,
			signIn,
			toResetPassword
		};
	}
};
</script>
