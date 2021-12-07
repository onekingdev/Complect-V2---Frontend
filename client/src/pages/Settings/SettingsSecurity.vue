<template lang="pug">
c-card(title="Security")
	template(#content)
		form.form-container
			h3 Change Email
			c-field(label="Current Email" required)
			c-field(label="New Email" required)
			h3 Reset Password
			c-field(label="Old Password" required)
			c-field(label="New Password" required)
			c-field(label="Confirm Password" required)
	template(#footer)
		c-button(title="Cancel" type="link")
		c-button(title="Save" type="primary")
</template>
