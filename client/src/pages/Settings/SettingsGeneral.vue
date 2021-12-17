<template lang="pug">
c-card(title="General")
	template(#content)
		form.form-container
			h3 Location
			//- c-select(label="Time Zone" :data="timezones" v-model="settings.timezone" required searchable)
			c-field(label="Time Zone" v-model="settings.timezone" required)
			c-field(label="Country" v-model="settings.country")
			c-field(label="State" v-model="settings.state")
			c-field(label="City" v-model="settings.city")
			c-field(label="Phone Number" v-model="settings.phone")
	template(#footer)
		c-button(title="Cancel" type="link")
		c-button(title="Save" type="primary")
</template>


<script>
import { reactive } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
// import { timezones } from "~/data/static.js";
export default {
	"components": { cSelect },
	setup () {
		const settings = reactive({
			"timezone": "",
			"country": "",
			"state": "",
			"city": "",
			"phone": ""
		});
		return {
			settings
			// timezones
		};
	}
};
</script>
