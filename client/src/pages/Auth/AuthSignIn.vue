<template lang="pug">
c-card
	template(#content)
		h1 Let's get you started!
		.form
			c-field(label="Email:" placeholder="example@email.com" type="email" v-model="data.email" fullwidth required)
			c-field(label="Password:" placeholder="********" type="password" v-model="data.password" fullwidth required)
			c-button(title="Sign In" type="primary" @click="signIn()" fullwidth)
			router-link(:to="{name: 'AuthResetPassword'}") Forgot Password
	template(#footer)
		p Don't have an account yet?&nbsp;
			router-link(:to="{name: 'AuthSignUp'}") Sign Up
</template>


<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
	setup () {
		const router = useRouter();
		const data = reactive({
			"email": "",
			"password": ""
		});
		const signIn = () => router.push({ "name": "AuthVerification" });
		return {
			data,
			signIn
		};
	}
};
</script>
