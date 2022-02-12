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
					c-button(type="primary" title="Save" @click="saveInformation()")
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
				c-select.col-3(label="Time Zone" placeholder="Select Time Zone" :data="timezones" v-model="timezone" required)
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
					c-button(type="primary" title="Save" @click="saveInformation()")
</template>


<script>
import { ref, reactive, computed, inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
import useProfile from "~/store/Profile.js";
import { industries, jurisdictions, timezones } from "~/data/static.js";
import { filterSubIndustries } from '~/core/utils.js';

const EMPTY_MY_PROFILE = {
	firstName: "",
	lastName: ""
}

const EMPTY_COMPANY = {
	company: "",
	crd: "",
	accounts: "",
	aum: "",
	industries: [],
	subIndustries: [],
	tel: "",
	website: "",
	address: "",
	address2: "",
	city: "",
	state: "",
	zip: ""
}

export default {
	"components": {
		cSelect,
		cUpload
	},
	setup () {
		const notification = inject( "notification" );
		const timezone = ref("");
		const avatar = ref("")
		const companyImg = ref("")
		const { profile, updateProfile } = useProfile();
		const update = reactive({});

		const restoreInformation = (section) => {
			avatar.value = ""
			if (section === 'my-profile') updateProfile( EMPTY_MY_PROFILE );
			if (section === 'company') updateProfile( EMPTY_COMPANY );
		}
		const saveInformation = () => {
			notification({
				"title": "Success",
				"message": "Information has been saved."
			});
			updateProfile( update )
		};

		const filteredSubIndustries = computed( () => filterSubIndustries(profile.value.industries, "business"));

		return {
			avatar,
			companyImg,
			industries,
			jurisdictions,
			filteredSubIndustries,
			timezone,
			timezones,
			profile,
			update,
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
