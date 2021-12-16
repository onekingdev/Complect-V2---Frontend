<template lang="pug">
c-card(title="General")
	template(#content)
		form.form-container
			h3 Location
			c-field(label="Time Zone" required)
			c-field(label="Country")
			c-field(label="State")
			c-field(label="City")
			c-field(label="Phone Number")
	template(#footer)
		c-button(title="Cancel" type="link")
		c-button(title="Save" type="primary")
</template>
<style lang="stylus" scoped>
.form-container
	width: 400px
</style>
