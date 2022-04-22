<template lang="pug">
.cell-user
	c-avatar(:firstName="data.first_name" :lastName="data.last_name" :avatar="data.avatar")
	.info
		.name {{ data.firstName }} {{ data.lastName }}
		.email {{ data.email }}
		.add-info {{ data.info }}
</template>


<script>
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cAvatar },
	"props": {
		"data": {
			"type": Object,
			"required": true,
			"default": { "firstName": "", "lastName": "" }
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-user
	.c-avatar
		margin-right: 0.5em
	.email
		color: var(--c-grey)
	.add-info
		color: var(--c-grey)
		font-size: 12px
</style>
