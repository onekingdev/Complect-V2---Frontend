<template lang="pug">
section.grid-6
	h3.semibold My Profile
	c-upload(:class="{'col-2': !isBusiness, 'col-full': isBusiness}" v-model="avatar")
	c-checkbox.availability.col-4(v-if="!isBusiness" label="Availability" type="toggle" v-model="form.availability")
	c-field.col-3(label="First Name" type="text" placeholder="First Name" :errors="errors.firstName" required v-model="form.firstName")
	c-field.col-3(label="Last Name" type="text" placeholder="Last Name" :errors="errors.lastName" required v-model="form.lastName")
	template(v-if="!isBusiness")
		c-textarea.col-full(label="Description" placeholder="Description" v-model="form.description")
		c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :errors="errors.jurisdictions" :data="jurisdictions" v-model="form.jurisdictions" required searchable multiple)
		c-select.col-3(label="Industry" placeholder="Select Industry" :errors="errors.industries" :data="industries" v-model="form.industries" required searchable multiple)
		c-select.col-3(label="Sub-Industry" placeholder="Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustries" searchable multiple)
		c-select.col-3(label="Former Regulator" placeholder="Search or add a tag" :data="[]" searchable multiple)
	.controls
		c-button(type="link" title="Cancel" @click="restoreInformation('my-profile')")
		c-button(type="primary" title="Save" @click="saveInformation('my-profile')")
	template(v-if="!isBusiness")
		.divider
		h3.semibold.col-5 Skills
		div.col-1
			c-button-modal.edit-skills(title="Edit Skills" modalTitle="Edit Skills")
				template(#content)
					c-select.col-full(label="Skills" placeholder="Search or add a tag" :data="skills" searchable multiple)
				template(#footer)
					c-button(title="Save" type="primary")
		section
			.skill(v-for="(skill, index) in form.skills" :key="index") {{ skill }}
		section.grid-6(v-if="!isBusiness")
			.divider
			user-experiences
	template(v-if="isBusiness")
		.divider
		section.grid-6
			h3.semibold Company Details
			c-upload(class="col-full" v-model="companyImg")
			c-field.col-3(label="Company Name" type="text" placeholder="Company Name" :errors="errors.company" required v-model="form.company")
			c-field.col-3(label="CRD Number" type="text" placeholder="CRD Number" v-model="form.crd")
			c-field.col-3(label="AUM" type="text" placeholder="AUM" v-model="form.aum")
			c-field.col-3(label="Number of Accounts" type="number" placeholder="Number of Accounts" v-model="form.accounts")
			c-select.col-3(label="Industry" placeholder="Select Industry" :data="industries" :errors="errors.industries" v-model="form.industries" required searchable multiple)
			c-select.col-3(label="Sub-Industry" placeholder="Sub-Industry" :data="filteredSubIndustries" v-model="form.subIndustries" searchable multiple)
			c-select.col-3(label="Jurisdiction" placeholder="Select Jurisdiction" :data="jurisdictions" :errors="errors.jurisdictions"  v-model="form.jurisdictions" required searchable multiple)
			c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :data="timezones" :errors="errors.timezone" v-model="form.timezone" required)
			c-field.col-3(label="Phone Number" type="text" placeholder="Phone Number" v-model="form.tel")
			c-field.col-3(label="Company Website" type="text" placeholder="Company Website" v-model="form.website")
			.divider
			c-address.col-5(label="Business Address" :value="form.address" :errors="errors.address" placeholder="Business Address" @update="updateAddressChange" required)
			c-field.col-1(label="Apt/Unit:" type="text" placeholder="Apt/Unit:" v-model="form.apt")
			c-field.col-2(label="City" type="text" placeholder="City" :errors="errors.city" required v-model="form.city")
			c-field.col-2(label="State" type="text" placeholder="State" :errors="errors.state" required v-model="form.state")
			c-field.col-2(label="Zip Code" type="text" placeholder="Zip Code" :errors="errors.zip" required v-model="form.zip")
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
import cAddress from "~/components/Inputs/cAddress.vue";
import useProfile from "~/store/Profile.js";
import useAuth from "~/core/auth.js";

import { industries, jurisdictions, timezones } from "~/data/static.js";
import { filterSubIndustries, validates } from "~/core/utils.js";
import { maxLength, required } from "@vuelidate/validators";
import { requireForArray } from "~/core/customValidates.js";
import { notifyMessages } from "~/data/notifications.js";

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
	"accounts": null,
	"aum": "",
	"tel": "",
	"website": "",
	"address": "",
	"apt": "",
	"city": "",
	"state": "",
	"zip": null
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

const validateRules = () => {
	const basicProfile = {
		"firstName": { required, "maxLength": maxLength( 100 ) },
		"lastName": { required, "maxLength": maxLength( 100 ) }
	};

	const industriesRules = {
		"jurisdictions": { "required": requireForArray },
		"industries": { "required": requireForArray },
		"timezone": { "required": requireForArray }
	};

	const specialistRules = {
		...basicProfile,
		...industriesRules
	};

	const companyRules = {
		...industriesRules,
		"company": { required, "maxLength": maxLength( 255 ) },
		"address": { required, "maxLength": maxLength( 255 ) },
		"city": { required, "maxLength": maxLength( 255 ) },
		"state": { required, "maxLength": maxLength( 255 ) },
		"zip": { required, "maxLength": maxLength( 20 ) }
	};

	return { basicProfile, specialistRules, companyRules };
};

const getValidateRules = ( isBusiness, section ) => {
	const { basicProfile, specialistRules, companyRules } = validateRules();
	if ( isBusiness && section === "my-profile" ) return basicProfile;
	if ( section === "company" ) return companyRules;
	if ( !isBusiness ) return specialistRules;

	return {};
};

export default {
	"components": {
		cAddress,
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
		const { profile, updateProfile, saveForm, isBusiness } = useProfile();
		const userType = profile.value.type;
		const errors = ref({});

		const form = ref({ ...profile.value });
		form.value.crd = profile.value.crd === false ? "" : profile.value.crd;

		// computed
		const filteredSubIndustries = computed( () => filterSubIndustries( form.value.industries, userType ) );
		const profileObject = isBusiness.value ? MY_PROFILE : SPECIALIST_PROFILE;

		// function
		const restoreInformation = section => {
			if ( section === "my-profile" ) saveForm( form, profileObject );
			if ( section === "company" ) saveForm( form, COMPANY );
		};

		const saveInformation = async section => {
			const fieldChanges = section === "my-profile" ? Object.keys( profileObject ) : Object.keys( COMPANY );
			const newData = {};
			fieldChanges.forEach( field => {
				newData[field] = form.value[field];
			});

			const rules = getValidateRules( isBusiness.value, section );
			errors.value = await validates( rules, newData );
			if ( Object.keys( errors.value ).length > 0 ) return;

			try {
				await onboarding( newData );
				updateProfile( newData );
				notification({
					"type": "success",
					"title": "Success",
					"message": notifyMessages.profile.save.success
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": notifyMessages.profile.save.error
				});
				console.error( error );
			}
		};

		const updateAddressChange = data => {
			const { address, city, state, zip } = data;
			form.value.address = address;
			if ( city ) form.value.city = city;
			if ( state ) form.value.state = state;
			if ( zip ) form.value.zip = zip;
		};

		return {
			form,
			tabs,
			errors,
			skills,
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
			saveInformation,
			updateAddressChange
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
	.availability
		position: relative;
		top: -3em;
	.skill
		display: inline-block;
		text-align: center;
		border: 1px solid var(--c-border)
		min-width: 2.5em;
		padding: 0.1em 0.3em;
		margin-right: 0.5em;
		border-radius: 0.3em;
		font-size: 0.8em;
	.edit-skills
		float: right
</style>
