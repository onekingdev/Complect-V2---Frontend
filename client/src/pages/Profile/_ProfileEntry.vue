<template lang="pug">
.page
	c-card(title="Profile")
		template(#content)
			section(v-for="section in sections")
				h3 {{section.title}}
				component(
					v-for="(input, key, index) in section.inputs"
					:key="index"
					:is="input.component"
					v-bind="input.props"
					:modelValue="profile[key]"
					@update:modelValue="update[key] = $event")
				.controls
					c-button(type="link" title="Cancel" @click="restoreInformation()")
					c-button(type="primary" title="Save" @click="saveInformation()")
</template>


<script>
import { reactive } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
import useProfile from "~/store/Profile.js";
import { industries, jurisdictions, timezones } from "~/data/static.js";
const sections = [
	{
		"title": "My Profile",
		"key": "my-profile",
		"inputs": {
			"avatar": {
				"component": "c-upload",
				"props": { "class": "col-full" }
			},
			"firstName": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "First Name",
					"placeholder": "John",
					"required": true
				}
			},
			"lastName": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "Last Name",
					"placeholder": "Smith",
					"required": true
				}
			}
		}
	}, {
		"title": "Company Details",
		"key": "my-company",
		"inputs": {
			"businessName": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "Company Name",
					"placeholder": "Company",
					"required": true
				}
			},
			"crd": {
				"component": "c-field",
				"props": {
					"type": "number",
					"label": "CRD number",
					"placeholder": "1234567890"
				}
			},
			"aum": {
				"component": "c-field",
				"props": {
					"type": "number",
					"label": "AUM",
					"placeholder": "1234567890"
				}
			},
			"accounts": {
				"component": "c-field",
				"props": {
					"type": "number",
					"label": "Number of Accounts",
					"placeholder": "150"
				}
			},
			"industries": {
				"component": "c-select",
				"props": {
					"label": "Industry",
					"placeholder": "Investment Adviser",
					"data": industries,
					"required": true
				}
			},
			// "subIndustries": {
			// 	"component": "c-select",
			// 	"props": {
			// 		"label": "Sub-Industry",
			// 		"placeholder": "Provide advice to mutual funds",
			// 		"data": subIndustries,
			// 		"required": true
			// 	}
			// },
			"jurisdictions": {
				"component": "c-select",
				"props": {
					"label": "Jurisdiction",
					"placeholder": "USA",
					"data": jurisdictions,
					"required": true
				}
			},
			"timeZone": {
				"component": "c-select",
				"props": {
					"label": "Time Zone",
					"placeholder": "America - Los Angeles",
					"data": timezones,
					"required": true
				}
			},
			"tel": {
				"component": "c-field",
				"props": {
					"type": "tel",
					"label": "Phone Number",
					"placeholder": "+1 234 567 890"
				}
			},
			"website": {
				"component": "c-field",
				"props": {
					"type": "url",
					"label": "Company Website",
					"placeholder": "www.example.com"
				}
			},
			"address1": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "Business Address",
					"placeholder": "1 Wilshire Blvd",
					"required": true,
					"class": "col-5"
				}
			},
			"address2": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "Apt/Unit",
					"placeholder": "7b",
					"class": "col-1"
				}
			},
			"city": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "City",
					"placeholder": "Los Angeles",
					"class": "col-2"
				}
			},
			"state": {
				"component": "c-field",
				"props": {
					"type": "text",
					"label": "State",
					"placeholder": "California",
					"required": true,
					"class": "col-2"
				}
			},
			"zip": {
				"component": "c-field",
				"props": {
					"type": "number",
					"label": "Zip",
					"placeholder": "90017",
					"required": true,
					"class": "col-2"
				}
			}
		}
	}
];

export default {
	"components": {
		cSelect,
		cUpload
	},
	setup () {
		const { profile, updateProfile } = useProfile();
		const update = reactive({});
		const restoreInformation = () => updateProfile( profile );
		const saveInformation = () => updateProfile( update );
		return {
			sections,
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
	section
		display: grid
		grid-template-columns: repeat(6, auto)
		align-items: flex-end
		gap: 1em
		h3
			font-weight: bold
			grid-column: 1 / -1
		.c-upload
			margin-bottom: 1em
		.c-field, .c-select
			grid-column: span 3
	.controls
		margin-top: 2em
		grid-column: 1 / -1
		justify-content: flex-end
		display: flex
		gap: 0.5em
</style>
