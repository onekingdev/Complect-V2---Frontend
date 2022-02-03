<template lang="pug">
div
	div.logo-setting
		h2 Logo
		p Upload the logo that will show up on the cover page of your compliance manual(Logo visible on white recommended)
		c-upload(v-model:modelValue="fileName")
	div.display-setting
		h2 Display Settings
		p Select what you want to display on the cover page
		c-checkbox.checkboxes(v-for="(checkbox, index) in arrayCheckboxes" :key="index" :label="checkbox.label" type="checkbox" :value="checkbox.value" v-model="checkedValues" multiple)
		c-textarea(placeholder="Enter Something" v-model="discluserValue")
		c-button(title="Reset" @click="resetSettings()")
		c-button(title="Save" type="primary" @click="saveSettings()")
</template>


<script>
import { onMounted, onUnmounted, ref, inject } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import cUpload from "~/components/Inputs/cUpload.vue";

export default {
	"components": { cBanner, cModal, cUpload },
	setup () {
		const policies = new UseData( "policies" );
		const notification = inject( "notification" );
		const checkedValues = ref([]);
		const discluserValue = ref();
		const fileName = ref( null );
		const arrayCheckboxes = [
			{ "label": "Address", "value": "address" },	{ "label": "Phone", "value": "phone" }, { "label": "Email", "value": "email" },	{ "label": "Disclouser", "value": "disclouser" }
		];

		const resetSettings = () => console.debug( "Reset" );
		const saveSettings = () => {
			notification({
				"type": "success",
				"title": "Policy Setting Updated Successfully"
			});
		};

		onMounted( () => policies.readDocuments() );
		onUnmounted( () => policies.clearStore() );

		return {
			checkedValues,
			arrayCheckboxes,
			resetSettings,
			saveSettings,
			discluserValue,
			fileName
		};
	}
};
</script>


<style lang="stylus" scoped>
.logo-setting
	margin-top: 10px
.display-setting
	margin-top: 30px
	.checkboxes
		margin-top: 5px
</style>
