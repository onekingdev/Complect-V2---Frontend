<template lang="pug">
.notification-message
	.nm-userlist
		.nm-individual
			c-avatar(firstName="Andrew" lastName="Gomez" size="small")
			.nm-individual-info
				p.info-name Andrew Gomez
				p.info-message Hey John, Lorem ipsum ...
			.nm-individual-day
				p.nm-date 2 days ago
		.nm-individual
			c-avatar(firstName="Andrew" lastName="Gomez" size="small")
			.nm-individual-info
				p.info-name Andrew Gomez
				p.info-message Hey John, Lorem ipsum ...
			.nm-individual-day
				p.nm-date 2 days ago
		.nm-individual
			c-avatar(firstName="Andrew" lastName="Gomez" size="small")
			.nm-individual-info
				p.info-name Andrew Gomez
				p.info-message Hey John, Lorem ipsum ...
			.nm-individual-day
				p.nm-date 2 days ago
	.nm-messagebox
		.nm-messagebox-content
			.nm-messagebox-message
				c-avatar(firstName="Andrew" lastName="Gomez")
				.nm-message-info
					p.info-name Andrew Gomez
					p.info-message Hey John, Lorem ipsum dolor sit amet, consectetur adipiscing elite
				.nm-message-day
					p.nm-date 2 days ago
			.nm-messagebox-message
				c-avatar(firstName="Andrew" lastName="Gomez")
				.nm-message-info
					p.info-name Andrew Gomez
					p.info-message Hey John, Lorem ipsum dolor sit amet, consectetur adipiscing elite
				.nm-message-day
					p.nm-date 2 days ago
			.nm-messagebox-message
				c-avatar(firstName="Andrew" lastName="Gomez")
				.nm-message-info
					p.info-name Andrew Gomez
					p.info-message Hey John, Lorem ipsum dolor sit amet, consectetur adipiscing elite
				.nm-message-day
					p.nm-date 2 days ago
			.nm-messagebox-message
				c-avatar(firstName="Andrew" lastName="Gomez")
				.nm-message-info
					p.info-name Andrew Gomez
					p.info-message Hey John, Lorem ipsum dolor sit amet, consectetur adipiscing elite
				.nm-message-day
					p.nm-date 2 days ago
			.nm-messagebox-message
				c-avatar(firstName="Andrew" lastName="Gomez")
				.nm-message-info
					p.info-name Andrew Gomez
					p.info-message Hey John, Lorem ipsum dolor sit amet, consectetur adipiscing elite
				.nm-message-day
					p.nm-date 2 days ago
			.nm-messagebox-message
				c-avatar(firstName="Andrew" lastName="Gomez")
				.nm-message-info
					p.info-name Andrew Gomez
					p.info-message Hey John, Lorem ipsum dolor sit amet, consectetur adipiscing elite
				.nm-message-day
					p.nm-date 2 days ago
		.mm-messagebox-input
			Editor.field-body(v-model="message" :init="{ height: 300, plugins: [ 'advlist autoresize autolink lists link image charmap print preview anchor' ], toolbar: 'bullist numlist outdent indent | removeformat | help'}")
			c-button.send-button(title="Send" type="primary")
</template>


<script>
import { onMounted, onUnmounted, ref, inject } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cBanner, cModal, cUpload, cAvatar },
	setup () {
		const message = ref( "" );
		const policySetting = new UseData( "policy_settings" );
		const notification = inject( "notification" );
		const arrayCheckboxes = ref([
			{ "label": "Address", "value": "address" },	{ "label": "Phone Number", "value": "phone" }, { "label": "Contact Email", "value": "email" },	{ "label": "Disclouser", "value": "disclouser" }
		]);

		// const policyForm = computed( () => policySetting.value.filter.( document => document.policyId ==  ) );
		const policyForm = ref({
			"fileName": "",
			"checkedValues": [],
			"disclouser": ""
		});

		const resetSettings = () => {
			policyForm.value.fileName = "";
			policyForm.value.checkedValues = [];
			policyForm.value.disclouser = "";
		};
		const saveSettings = async () => {
			try {
				await policySetting.createDocuments([policyForm.value]);
				notification({
					"type": "success",
					"title": "Success",
					"message": "Setting has been updated."
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Setting has not been updated. Please try again."
				});
			}
		};

		onMounted( () => policySetting.readDocuments() );
		onUnmounted( () => policySetting.clearStore() );

		return {
			arrayCheckboxes,
			resetSettings,
			saveSettings,
			policyForm,
			message
		};
	}
};
</script>


<style lang="stylus" scoped>
.notification-message
	border: 1px solid var(--c-border)
	border-radius: 5px
	display: flex
	flex-direction: row
	.nm-userlist
		width: 25%
		border-right: 1px solid var(--c-border)
		.nm-individual
			border-bottom: 1px solid var(--c-border)
			display: flex
			flex-direction: row
			gap: 0.6em
			padding: 0.6em
			align-items: center
			.nm-individual-info
				.info-name
					font-size: 16px
					font-weight: 700
				.info-message
					font-size: 14px
					color: var(--c-grey-500)
			.nm-individual-day
				margin-left: auto;
				.nm-date
					font-size: 14px
					color: var(--c-grey-500)
	.nm-messagebox
		width: 75%
		height: 48em
		.nm-messagebox-content
			border-bottom: 1px solid var(--c-border)
			height: 30em
			padding: 0em 1em 0.5em 1em
			overflow: auto
			.nm-messagebox-message
				border-bottom: 1px solid var(--c-border)
				padding: 1.25em 0
				display: flex
				flex-direction: row
				gap: 0.6em
				.nm-message-info
					.info-name
						font-size: 16px
						font-weight: 700
					.info-message
						font-size: 14px
						color: var(--c-grey-500)
				.nm-message-day
					margin-left: auto;
					.nm-date
						font-size: 14px
						color: var(--c-grey-500)
		.mm-messagebox-input
			padding: 1em
			height: 18em
			.send-button
				margin-left: auto;
				margin-top: 1.5em

</style>
