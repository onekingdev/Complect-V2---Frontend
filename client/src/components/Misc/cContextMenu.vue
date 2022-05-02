<template lang="pug">
.c-context-menu(ref="contextMenu")
	.label(@click="toggleVisibility()" :class="{active: listVisible}") {{label}}
	.list.card-style(v-show="listVisible")
		slot(name="default")
</template>


<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
export default {
	"props": {
		"label": {
			"type": String,
			"default": ""
		}
	},
	setup () {
		const contextMenu = ref( null );
		const listVisible = ref( false );
		const toggleVisibility = () => listVisible.value = !listVisible.value;
		onClickOutside( contextMenu, () => listVisible.value = false );

		return { contextMenu, listVisible, toggleVisibility };
	}
};
</script>


<style lang="stylus" scoped>
.c-context-menu
	position: relative
	.label
		color: var(--c-link)
		cursor: pointer
		padding: 0.2em 0.5em
		line-height: 1.3
		margin-bottom: 0.2em
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
	.list
		position: absolute
		z-index: 1
		top: 0
		left: 60%
		background: #fff
		padding: 1em 0.5em
		width: 12em
		max-height: 15em
		overflow-y: scroll
		display: flex
		flex-direction: column
		gap: 0.3em
</style>
