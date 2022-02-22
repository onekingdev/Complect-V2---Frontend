<template lang="pug">
c-dropdown(iconR="more" type="transparent")
	c-button(v-for="(item, index) in meta.actions" :key="index" :title="item.title" @click="item.action(id)" type="transparent" )
</template>


<script>
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown },
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"meta": {
			"type": Object,
			"default": () => {}
		}
	}
};
</script>


<style lang="stylus" scoped>
.c-dropdown
	:deep(.dropdown)
		border-radius: 5px
		top: 2.5em
		left: -100%
		min-width: 8em
	:deep(.c-button)
		padding: 0.6em 1em
		.title
			font-size: 1.2em
			color: var(--c-headers)
			font-weight: 600
</style>
