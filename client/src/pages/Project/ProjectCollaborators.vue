<template lang="pug">
card-container(title="Collaborators")
	template(#controls)
		c-button(title="New Collaborator" type="default")
	template(#content)
		.ind-collaborator(v-for="collaborator in projectDetail?.collaborators")
			c-avatar(:firstName="collaborator.firstName" :lastName="collaborator.lastName" :avatar="collaborator.avatar")
			.user-info
				.name {{ collaborator.firstName }} {{ collaborator.lastName }}
			.action
				c-button(title="Delete" type="default" @click="deleteCollaborator()")
				c-button(title="End Contract" type="default" @click="endContract()")
</template>
<script>
import cBanner from "~/components/Misc/cBanner.vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
import cModal from "~/components/Misc/cModal.vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": {
		cBanner,
		definitionList,
		cModal,
		cAvatar
	},
	"props": {
		"projectDetail": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	"emits": ["update:projectDetail"],
	setup () {
		const deleteCollaborator = () => {};
		const endContract = () => {};
		return {
			deleteCollaborator,
			endContract
		};
	}
};
</script>
<style lang="stylus" scoped>
.ind-collaborator
	display: flex
	padding-bottom: 0.7em
	border-bottom: 1px solid var(--c-border)
	.c-avatar
		margin-right: 0.5em
	.user-info
		.name
			font-size: 20px
			margin-top: 0.325em
	.action
		margin-left: auto
		display: flex
		gap: 0.5em

</style>
