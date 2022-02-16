<template lang="pug">
card-container(title="General")
	template(#content)
		form.form-container
			h3 Location
			div {{ profile }}
			//- c-select(label="Time Zone" :data="timezones" v-model="profile.timezone" required searchable)
			c-select(label="Country" :data="countries" v-model="profile.country" required searchable)
			c-field(label="State" v-model="profile.state")
			c-field(label="City" v-model="profile.city")
			c-field(label="Phone Number" v-model="profile.tel")
	template(#footer)
		c-button(title="Cancel" type="link")
		c-button(title="Save" type="primary" @click="saveInformation()")
</template>


<script>
import { inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import { timezones, countries } from "~/data/static.js";

import useProfile  from "~/store/Profile.js";
import useAuth from "~/core/auth.js";

const BASE_DATA = {
	"timezone": "",
	"country": "",
	"state": "",
	"city": "",
	"tel": ""
}

export default {
	"components": { cSelect },
	setup () {
		const { profile } = useProfile();
		const { onboarding } = useAuth();
		const notification = inject('notification')

		const saveInformation = async () => {
			const newData = {}
			
			Object.keys(BASE_DATA).forEach( field => {
				newData[field] = profile.value[field];
			});
			
			try {
				await onboarding( newData );
				notification({
					"title": "Success",
					"message": "Information has been saved."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Information has not been saved."
				});
				console.error( error );
			}
		}

		return {
			profile,
			countries,
			timezones,
			saveInformation
		};
	}
};
</script>
