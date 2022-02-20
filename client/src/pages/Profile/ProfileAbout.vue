<template lang="pug">
section.grid-6
	h3 My Profile
	c-upload(:class="{'col-2': !isBusiness, 'col-full': isBusiness}" v-model="avatar")
	c-checkbox.col-4(v-if="!isBusiness" label="Availability" type="toggle" v-model="profile.availability")
	c-field.col-3(label="First Name" type="text" placeholder="First Name" required v-model="profile.firstName")
	c-field.col-3(label="Last Name" type="text" placeholder="Last Name" required v-model="profile.lastName")
	template(v-if="!isBusiness")
		c-textarea.col-full(label="Description" placeholder="Description" v-model="profile.description" required)
		c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :data="jurisdictions" v-model="profile.jurisdictions" required searchable multiple)
		c-select.col-3(label="Industry" placeholder="Select Industry" :data="industries" v-model="profile.industries" required searchable multiple)
		c-select.col-3(label="Sub-Industry" placeholder="Sub-Industry" :data="filteredSubIndustries" v-model="profile.subIndustries" required searchable multiple)
		c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :data="timezones" v-model="profile.timezone" required)
	.controls
		c-button(type="link" title="Cancel" @click="restoreInformation('my-profile')")
		c-button(type="primary" title="Save" @click="saveInformation('my-profile')")
	template(v-if="!isBusiness")
		.divider
		h3.col-5 Skills
		div.col-1
			c-button-modal.edit-skills(title="Edit Skills" modalTitle="Edit Skills" type="primary")
				template(#content)
					c-select.col-full(label="Skills" placeholder="Search or add a tag" :data="skills" searchable multiple)
				template(#footer)
					c-button(title="Save" type="primary")
		section
			.skill(v-for="(skill, index) in profile.skills" :key="index") {{ skill }}
		section.grid-6(v-if="!isBusiness")
			.divider
			user-experiences
	template(v-if="isBusiness")
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
			c-field.col-1(label="Apt/Unit:" type="text" placeholder="Apt/Unit:" v-model="profile.apt")
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
import HorizontalTabs from "~/components/Containers/HorizontalTabs.vue";
import UserExperiences from "~/pages/Profile/components/UserExperiences.vue";
import useProfile from "~/store/Profile.js";
import useAuth from "~/core/auth.js";

import { industries, jurisdictions, timezones } from "~/data/static.js";
import { filterSubIndustries } from "~/core/utils.js";


const COMMON_FIELDS = {
	"industries": [],
	"subIndustries": [],
	"jurisdictions": [],
	"timezone": ""
};

const MY_PROFILE = {
	"firstName": "",
	"lastName": ""
};

const SPECIALIST_PROFILE = {
	...MY_PROFILE,
	...COMMON_FIELDS,
	"availability": false,
	"description": ""
};

const COMPANY = {
	...COMMON_FIELDS,
	"company": "",
	"crd": "",
	"accounts": "",
	"aum": "",
	"tel": "",
	"website": "",
	"address": "",
	"apt": "",
	"city": "",
	"state": "",
	"zip": ""
};

const tabs = [
	{
		"title": "About",
		"routeName": "ProfileAbout"
	}, {
		"title": "Settings",
		"routeName": "ProfileSettings"
	}
];

const skills = [
	{ "title": "HTML", "value": "html" }, { "title": "CSS", "value": "css" }, { "title": "Javascript", "value": "js" }
];

export default {
	"components": {
		UserExperiences,
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

		// computed
		const filteredSubIndustries = computed( () => filterSubIndustries( profile.value.industries, "business" ) );
		const isBusiness = computed( () => userType === "business" );
		const profileObject = isBusiness.value ? MY_PROFILE : SPECIALIST_PROFILE;

		// function
		const restoreInformation = section => {
			if ( section === "my-profile" ) updateProfile( profileObject );
			if ( section === "company" ) updateProfile( COMPANY );
		};

		const saveInformation = async section => {
			const fieldChanges = section === "my-profile" ? Object.keys( profileObject ) : Object.keys( COMPANY );
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

		return {
			tabs,
			skills,
			userType,
			avatar,
			companyImg,
			industries,
			jurisdictions,
			filteredSubIndustries,
			timezone,
			timezones,
			profile,
			isBusiness,
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
	:deep(.c-button-modal)
		.c-button
			width: 10em
			float: right
	.skill
		display: inline-block;
		text-align: center;
		border: 1px solid #ccc;
		min-width: 2.5em;
		padding: 0.1em 0.3em;
		margin-right: 0.5em;
		border-radius: 0.3em;
		font-size: 0.8em;
	.edit-skills
		float: right
</style>
