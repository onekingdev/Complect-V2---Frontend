<template lang="pug">
section.grid-6
  h3 Your Hourly Rate
  c-field.col-full(label="Hourly Rate" type="number" placeholder="Hourly Rate" v-model="profile.rate" required)
  div.perhour Per hour
  .divider
  h3 Experience Level
  c-radio-cards(id="experience" :data="experienceOptions" v-model="profile.experience")
  .divider
  h3 Name Settings
  c-radios(id="regulator" :data="radioOptions" v-model="profile.showFullName")
  .controls
    c-button(type="primary" title="Save" @click="saveInformation('company')")
</template>

<script>
import { inject } from "vue";
import cRadioCards from "~/components/Inputs/cRadioCards.vue";
import cRadios from "~/components/Inputs/cRadios.vue";
import useAuth from "~/core/auth.js";
import useProfile from "~/store/Profile.js";

export default {
	"components": {
		cRadios,
		cRadioCards
	},
	setup () {
		const experienceOptions = [
			{ "value": 0, "title": "Junior", "description": "Beginner consultant with some industry experience." }, { "value": 1, "title": "Intermediate", "description": "Good experience and solid knowledge of the industry." }, { "value": 2, "title": "Expert", "description": "Deep understanding of industry with varied experience." }
		];

		const radioOptions = [
			{ "title": "Show my full name (ex. John Doe)", "value": true }, { "title": "Show my first name and first letter of my last (ex. John D.)", "value": false }
		];

		const { onboarding } = useAuth();
		const notification = inject( "notification" );
		const { profile } = useProfile();

		const saveInformation = async () => {
			const data = {
				"rate": profile.value.rate,
				"experience": profile.value.experience,
				"showFullName": profile.value.showFullName
			};

			try {
				await onboarding( data );
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
			profile,
			experienceOptions,
			radioOptions,
			saveInformation
		};
	}
};
</script>


<style lang="stylus" scoped>
.perhour
  margin-top: -0.7em;
  font-size: 0.7em;
.controls
  grid-column: 1 / -1
  justify-content: flex-end
  display: flex
</style>
