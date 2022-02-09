<template lang="pug">
div.setup-div
	div.logo-setting
		h2 Logo
		p.setting-text Upload the logo that will show up on the cover page of your compliance manual(Logo visible on white recommended)
		c-upload(v-model:modelValue="fileName")
	div.display-setting
		h2 Display Settings
		p.setting-text Select what you want to display on the cover page
		c-checkbox.checkboxes(v-for="(checkbox, index) in arrayCheckboxes" :key="index" :label="checkbox.label" :value="checkbox.value" v-model="checkedValues" multiple)
		c-textarea.text-area(placeholder="Enter Something" v-model="discluserValue")
		c-button.action-buttons(title="Reset" @click="resetSettings()" type="inline-button default")
		c-button.action-buttons(title="Save" type="primary inline-button" @click="saveSettings()")
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
		const discluserValue = ref( "" );
		const fileName = ref( null );
		const arrayCheckboxes = ref([
			{ "label": "Address", "value": "address" },	{ "label": "Phone", "value": "phone" }, { "label": "Email", "value": "email" },	{ "label": "Disclouser", "value": "disclouser" }
		]);

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
.setup-div
	width: 60%
	.logo-setting
		margin-top: 10px
	.setting-text
		font-size: 14px
		margin-bottom: 1rem
	.display-setting
		margin-top: 30px
		.checkboxes
			margin-bottom: 1rem
		.action-buttons
			margin-top: 1rem
</style>
