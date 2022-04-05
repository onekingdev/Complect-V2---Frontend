<template lang="pug">
.cell-action(v-if="meta" @click="meta.action(id)")
	icon(:name="meta.icon")
	.title {{meta.title}}
</template>


<script>
export default {
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"meta": {
			"type": Object,
			"default": () => {},
			"required": false
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-action
	max-width: 20em
	display: flex
	align-items: center
	gap: 0.5em
	cursor: pointer
	color: var(--c-blue)
</style>
