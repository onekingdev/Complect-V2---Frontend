<template lang="pug">
card-container(title="Security")
	template(#content)
		div {{ profile }}
		div.grid-6
			h3 Change Email
			c-field(label="Current Email" v-model="profile.email" required disabled)
			.new-email
				c-field.new-email-input(label="New Email" required)
				.actions
					c-button.save-btn(title="Save" type="primary" @click="update('Email')")
			h3 Reset Password
			c-field(label="Old Password" type="password" v-model="form.oldPassword" required)
			c-field(label="New Password" type="password" v-model="form.newPassword" required)
			c-field(label="Confirm Password" type="password" v-model="form.confirmPassword" required)
			.actions
				c-button(title="Cancel" type="link")
				c-button(title="Save" type="primary" @click="update('Password')")
		.divider
		h3 Delete Account
		div By deleting your account, you will purge all information and saved documents associated with this account. This deletion cannot be reversed.  Please take appropriate steps to save down to your own storage devices  any records you need to access after the deletion of this account.
		c-button.delete-btn(title="Delete")
	template(#footer)
		c-button(title="Cancel" type="link")
		c-button(title="Save" type="primary")
</template>


<script>
import { ref, inject } from "vue";
import useProfile  from "~/store/Profile.js";
import useAuth from "~/core/auth.js";

export default {
	setup () {
		const { profile } = useProfile();
		const { updateSecurity } = useAuth();
		const notification = inject('notification');
		const errors = {}

		const form = ref({"newEmail": "", "oldPassword": "", "newPassword": "", "confirmPassword": ""})
		
		const update = async (type) => {
			const isUpdateEmail = type === "Email"
			const emailData = { "email": form.value.newEmail, "type": "email" }
			const passwordData = { "oldPassword": form.value.oldPassword, "newPassword": form.value.newPassword, "type": "password" }
			
			const data = isUpdateEmail ? emailData : passwordData
			
			try {
				await updateSecurity( data );
				if (isUpdateEmail) profile.value.email = form.value.newEmail
				notification({
					"title": "Success",
					"message": `${type} has been updated.`
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": `${type} has not been updated. Please try again.`
				});
				console.error( error );
			}
		}

		return {
			form,
			profile,
			update
		}
	}
}
</script>


<style lang="stylus" scoped>
:deep(.c-button.delete-btn)
	width: 5em
	color: #f00
.new-email
	display: flex
	.new-email-input
		flex: 90%;
		padding-right: 1em;
		margin-right: auto;
		gap: 1em
	.save-btn
		position: relative;
		top: 0.7em;
.actions
	display: flex;
	align-items: center;
	justify-content: flex-end;
</style>