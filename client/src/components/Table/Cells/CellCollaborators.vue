<template lang="pug">
.cell-collaborators(v-if="data.length")
	c-avatar(v-for="user in data" size="small" :avatar="user.avatar" :firstName="user.firstName" :lastName="user.lastName" :title="`${user.firstName} ${user.lastName}`")
</template>


<script>
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cAvatar },
	"props": {
		"data": {
			"type": Array,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-collaborators
	gap: 0.3em
</style>
