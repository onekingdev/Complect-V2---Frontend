<template lang="pug">
.notification-center
	h2.ncenter-title Today
	.ncenter-content
		c-avatar(firstName="Andrew" lastName="Gomez" size="small")
		.ncenter-description
			p Andrew Gomez requested to extend the deadline for 13F Filing.
			p.ncenter-time 0:00 PM
		.ncenter-button
			c-button(title="View")
			c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	.ncenter-content
		c-avatar(firstName="Andrew" lastName="Gomez" size="small")
		.ncenter-description
			p Andrew Gomez requested to extend the deadline for 13F Filing.
			p.ncenter-time 0:00 PM
		.ncenter-button
			c-button(title="View")
			c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	.ncenter-content
		c-avatar(firstName="Andrew" lastName="Gomez" size="small")
		.ncenter-description
			p Andrew Gomez requested to extend the deadline for 13F Filing.
			p.ncenter-time 0:00 PM
		.ncenter-button
			c-button(title="View")
			c-button(type="icon" iconL="close" size="small" @click="closeModal()")

	h2.ncenter-title Previous
	.ncenter-content
		c-avatar(firstName="Andrew" lastName="Gomez" size="small")
		.ncenter-description
			p Andrew Gomez requested to extend the deadline for 13F Filing.
			p.ncenter-time 0:00 PM
		.ncenter-button
			c-button(title="View")
			c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	.ncenter-content
		c-avatar(firstName="Andrew" lastName="Gomez" size="small")
		.ncenter-description
			p Andrew Gomez requested to extend the deadline for 13F Filing.
			p.ncenter-time 0:00 PM
		.ncenter-button
			c-button(title="View")
			c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	.ncenter-content
		c-avatar(firstName="Andrew" lastName="Gomez" size="small")
		.ncenter-description
			p Andrew Gomez requested to extend the deadline for 13F Filing.
			p.ncenter-time 0:00 PM
		.ncenter-button
			c-button(title="View")
			c-button(type="icon" iconL="close" size="small" @click="closeModal()")
</template>


<script>
import { onMounted, onUnmounted, ref } from "vue";
import UseData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import cUpload from "~/components/Inputs/cUpload.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cBanner, cModal, cUpload, cAvatar },
	setup () {
		const notifiCollection = new UseData( "notifications" );
		const arrayCheckboxes = ref([
			{ "label": "Address", "value": "address" },	{ "label": "Phone Number", "value": "phone" }, { "label": "Contact Email", "value": "email" },	{ "label": "Disclouser", "value": "disclouser" }
		]);

		const closeModal = id => {
			notifiCollection.updateDocuments( id, { "read_at": Date.now() });
			notifiCollection.readDocuments();
		};

		onMounted( () => notifiCollection.readDocuments() );
		onUnmounted( () => notifiCollection.clearStore() );

		return {
			arrayCheckboxes,
			closeModal
		};
	}
};
</script>


<style lang="stylus" scoped>
.notification-center
	.ncenter-title
		font-weight: 700
		font-size: 14px
		margin: 20px 0px
	.ncenter-content
		display: flex
		padding: 1em
		border: 1px solid var(--c-border)
		border-radius: 5px
		flex-direction: row
		gap: 0.6em
		align-items: center
		.ncenter-description
			.ncenter-time
				color: var(--c-grey-500)
		.ncenter-button
			margin-left: auto
			display: flex
			flex-direction: row
			gap: 0.6em
</style>
