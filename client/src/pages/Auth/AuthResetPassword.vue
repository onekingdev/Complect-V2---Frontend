<template lang="pug">
c-card
	template(#content)
		h1 Reset Password
		p Please enter the email address used to log into your account to receive a link to reset your password. If you no longer have access to that email account, please contact us at&nbsp;
			a(href="mailto:help@complect.com") help@complect.com&nbsp;
			| for assistance.
		.form.grid-6
			c-field(label="Email" placeholder="example@email.com" v-model="email" fullwidth required)
			c-button(title="Reset" type="primary" @click="resetPassword()" fullwidth)
	template(#footer)
		c-button(title="Cancel" type="link" @click="goToSignIn()")
</template>


<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "~/core/auth";
export default {
	setup () {
		const router = useRouter();
		const email = ref( "" );
		const { reset } = useAuth();

		const resetPassword = async () => {
			try {
				await reset( email.value );
			} catch ( error ) {
				console.error( error );
			}
		};
		const goToSignIn = () => router.push({ "name": "AuthSignIn" });

		return {
			email,
			resetPassword,
			goToSignIn
		};
	}
};
</script>
