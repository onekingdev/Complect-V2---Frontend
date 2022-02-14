<template lang="pug">
.page
	card-container(title="Profile")
		template(#content)
			horizontal-tabs
				template(#tabs)
					router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ tab.title }}
				template(#content)
					router-view
			//- template(v-if="userType === 'business'")
			//- 	section.grid-6
			//- 		h3 My Profile
			//- 		c-upload(class="col-full" v-model="avatar")
			//- 		c-field.col-3(label="First Name" type="text" placeholder="First Name" required v-model="profile.firstName")
			//- 		c-field.col-3(label="Last Name" type="text" placeholder="Last Name" required v-model="profile.lastName")
			//- 		.controls
			//- 			c-button(type="link" title="Cancel" @click="restoreInformation('my-profile')")
			//- 			c-button(type="primary" title="Save" @click="saveInformation('my-profile')")
</template>


<script>
import { ref, computed, inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
import HorizontalTabs from "~/components/Containers/HorizontalTabs.vue";

import useProfile from "~/store/Profile.js";
import useAuth from "~/core/auth.js";
import { industries, jurisdictions, timezones } from "~/data/static.js";
import { filterSubIndustries } from "~/core/utils.js";

const MY_PROFILE = {
	"firstName": "",
	"lastName": ""
};

const COMPANY = {
	"company": "",
	"crd": "",
	"accounts": "",
	"aum": "",
	"industries": [],
	"subIndustries": [],
	"tel": "",
	"website": "",
	"address": "",
	"address2": "",
	"city": "",
	"state": "",
	"zip": ""
};

export default {
	"components": {
		cSelect,
		cUpload,
		HorizontalTabs
	},
	setup () {
		const notification = inject( "notification" );
		const timezone = ref( "" );
		const avatar = ref( "" );
		const companyImg = ref( "" );
		const { onboarding } = useAuth();
		const { profile, updateProfile } = useProfile();
		const userType = profile.value.type;

		profile.value.crd = profile.value.crd === false ? "" : profile.value.crd;

		const restoreInformation = section => {
			if ( section === "my-profile" ) updateProfile( MY_PROFILE );
			if ( section === "company" ) updateProfile( COMPANY );
		};

		const saveInformation = async section => {
			const fieldChanges = section === "my-profile" ? Object.keys( MY_PROFILE ) : Object.keys( COMPANY );
			const newData = {};
			fieldChanges.forEach( field => {
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
		};

		const filteredSubIndustries = computed( () => filterSubIndustries( profile.value.industries, "business" ) );

		const tabs = [
			{
				"title": "About",
				"routeName": "ProfileAbout"
			}, {
				"title": "Settings",
				"routeName": "ProfileSettings"
			}
		];

		return {
			tabs,
			userType,
			avatar,
			companyImg,
			industries,
			jurisdictions,
			filteredSubIndustries,
			timezone,
			timezones,
			profile,
			restoreInformation,
			saveInformation
		};
	}
};
</script>


<style lang="stylus" scoped>
.page
	padding: 2em
	.card
		max-width: 45em
		overflow: hidden
		margin: 0 auto
	.controls
		margin-top: 1em
		grid-column: 1 / -1
		justify-content: flex-end
		display: flex
		gap: 0.5em
</style>
