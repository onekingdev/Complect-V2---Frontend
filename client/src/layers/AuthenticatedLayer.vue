<template lang="pug">
.layout.layout-authenticated
	TopBar
	SideBar
	main
		router-view
</template>


<script>
import TopBar from "~/components/Bars/TopBar.vue";
import SideBar from "~/components/Bars/SideBar.vue";
export default {
	"components": {
		TopBar,
		SideBar
	}
};
</script>


<style lang="stylus" scoped>
.layout.layout-authenticated
	width: 100%
	height: 100%
	display: grid
	grid-template-columns: auto 1fr
	grid-template-rows: max-content auto max-content
	position: relative
	.bar.topbar
		grid-column: 1/-1
		position: sticky
		top: 0
		z-index: 3
	.bar.sidebar
		z-index: 2
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
		+ main
			grid-column: span 1
	.bar.devbar
		z-index: 10
		grid-column: 1/-1
	main
		background: var(--c-bg-z1)
		z-index: 1
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
		grid-column: span 2
</style>
