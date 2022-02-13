<template lang="pug">
.page
	card-container(title="Profile")
		template(#content)
			section.grid-6
				h3 My Profile
				c-upload(class="col-full" v-model="avatar")
				c-field.col-3(label="First Name" type="text" placeholder="First Name" required v-model="profile.firstName")
				c-field.col-3(label="Last Name" type="text" placeholder="Last Name" required v-model="profile.lastName")
				.controls
					c-button(type="link" title="Cancel" @click="restoreInformation('my-profile')")
					c-button(type="primary" title="Save" @click="saveInformation('my-profile')")
			.divider
			section.grid-6
				h3 Company Details
				c-upload(class="col-full" v-model="companyImg")
				c-field.col-3(label="Company Name" type="text" placeholder="Company Name" required v-model="profile.company")
				c-field.col-3(label="CRD Number" type="text" placeholder="CRD Number" required v-model="profile.crd")
				c-field.col-3(label="AUM" type="text" placeholder="AUM" required v-model="profile.aum")
				c-field.col-3(label="Number of Accounts" type="text" placeholder="Number of Accounts" required v-model="profile.accounts")
				c-select.col-3(label="Industry" placeholder="Select Industry" :data="industries" v-model="profile.industries" required searchable multiple)
				c-select.col-3(label="Sub-Industry" placeholder="Sub-Industry" :data="filteredSubIndustries" v-model="profile.subIndustries" required searchable multiple)
				c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :data="jurisdictions" v-model="profile.jurisdictions" required searchable multiple)
				c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :data="timezones" v-model="profile.timezone" required)
				c-field.col-3(label="Phone Number" type="text" placeholder="Phone Number" v-model="profile.tel")
				c-field.col-3(label="Company Website" type="text" placeholder="Company Website" v-model="profile.website")
				.divider
				c-field.col-5(label="Business Address" type="text" placeholder="Business Address" required v-model="profile.address")
				c-field.col-1(label="Apt/Unit:" type="text" placeholder="Apt/Unit:" v-model="profile.address2")
				c-field.col-2(label="City" type="text" placeholder="City" required v-model="profile.city")
				c-field.col-2(label="State" type="text" placeholder="State" required v-model="profile.state")
				c-field.col-2(label="Zip Code" type="number" placeholder="Zip Code" required v-model="profile.zip")
				.controls
					c-button(type="link" title="Cancel" @click="restoreInformation('company')")
					c-button(type="primary" title="Save" @click="saveInformation('company')")
</template>


<script>
import { ref, computed, inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
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
		cUpload
	},
	setup () {
		const notification = inject( "notification" );
		const timezone = ref( "" );
		const avatar = ref( "" );
		const companyImg = ref( "" );
		const { onboarding } = useAuth();
		const { profile, updateProfile } = useProfile();

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

		return {
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
