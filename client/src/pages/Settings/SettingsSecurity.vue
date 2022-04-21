<template lang="pug">
card-container(title="Security")
	template(#content)
		div.grid-6.width-50
			h3 Change Email
			c-field.current-email(label="Current Email" v-model="profile.email" disabled)
			.new-email
				c-field.new-email-input(label="New Email"  v-model.trim="emailForm.newEmail" :errors="errors.newEmail" required)
				.actions
					c-button.save-btn(title="Save" type="primary" :class="{ 'none': errors.newEmail }" @click="update('Email')")
			h3 Reset Password
			c-field(label="Old Password" type="password" :errors="errors.password" v-model="passwordForm.password" required)
			c-field(label="New Password" type="password" :errors="errors.newPassword" v-model="passwordForm.newPassword" required)
			div.min-password Minimum 6 characters
			c-field(label="Confirm Password" type="password" :errors="errors.confirmPassword" v-model="passwordForm.confirmPassword" required)
			.actions
				c-button(title="Cancel" type="link" @click="clearData('Password')")
				c-button(title="Save" type="primary" @click="update('Password')")
		.divider
		h3 Delete Account
		p.notice.width-50
			| By deleting your account,
			| you will purge all information and saved
			| documents associated with this account. This deletion cannot be reversed. Please take appropriate steps to save down to your own storage devices  any records you need to access after the deletion of this account.
		c-button.delete-btn(title="Delete")
</template>


<script>
import { ref, inject, computed } from "vue";
import useProfile from "~/store/Profile.js";
import useAuth from "~/core/auth.js";
import { validates } from "~/core/utils.js";
import { sameAsWith } from "~/core/customValidates.js";
import { required, email, minLength } from "@vuelidate/validators";
import { notifyMessages } from "~/data/notifications.js";


export default {
	setup () {
		const { profile } = useProfile();
		const { updateAuthenticationInfor } = useAuth();
		const notification = inject( "notification" );
		const errors = ref({});
		const emailForm = ref({ "type": "email" });
		const passwordForm = ref({ "type": "password" });

		const clearData = type => {
			if ( type === "Email" ) emailForm.value = {};
			else passwordForm.value = {};
		};

		const hasErrors = computed( () => Object.keys( errors.value ).length > 0 );

		const validateEmail = { "newEmail": { email, required } };

		const validatePasswordChange = {
			"password": { required },
			"newPassword": { required, "minLength": minLength( 6 ) },
			"confirmPassword": { required, "sameAsPassword": sameAsWith( "newPassword" ) }
		};

		const update = async type => {
			const isUpdateEmail = type === "Email";
			const rules = isUpdateEmail ? validateEmail : validatePasswordChange;
			const data = isUpdateEmail ? emailForm.value : passwordForm.value;
			errors.value = await validates( rules, data );

			if ( hasErrors.value ) return;

			try {
				await updateAuthenticationInfor( data );
				if ( isUpdateEmail ) profile.value.email = emailForm.value.newEmail;

				clearData( type );

				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.profile[type.toLowerCase()].success
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.profile[type.toLowerCase()].error
				});
				console.error( error );
				errors.value[type.toLowerCase()] = [error];
			}
		};

		return {
			errors,
			emailForm,
			passwordForm,
			profile,
			clearData,
			update
		};
	}
};
</script>


<style lang="stylus" scoped>
.page
	width: 50%;
.min-password
	font-size: 0.7em;
:deep(.c-button.delete-btn)
	width: 5em;
	color: #f00;
:deep(.c-field.current-email)
	.field-body
		background: #e9ecef;
.new-email
	display: flex;
	.new-email-input
		flex: 90%;
		padding-right: 1em;
		margin-right: auto;
		gap: 1em;
	.save-btn
		position: relative;
		top: 0.7em;
		&.none
			top: 0;
.notice
	font-size: 0.9em;
</style>
