<template lang="pug">
.cell-collaborators(v-if="data.length")
	c-avatar(v-for="user in data" size="small" :avatar="user.avatar" :firstName="user.first_name" :lastName="user.last_name" :title="`${user.first_name} ${user.last_name}`")
</template>


<script>
import { computed } from "vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
export default {
	"components": { cAvatar },
	"props": {
		"data": {
			"type": Array,
			"required": true
		}
	},
	setup ( props ) {
		const collaborators = computed( () => {
			if ( props.data.length > 3 ) {}
		});
	}
};
</script>


<style lang="stylus" scoped>
.cell-collaborators
	gap: 0.3em
</style>
