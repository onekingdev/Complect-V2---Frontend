<template lang="pug">
.layout.layout-authenticated
	Topbar
	Sidebar
	main
		router-view
	//- Devbar
</template>


<script>
import { defineAsyncComponent, onMounted } from "vue";
import useInit from "~/core/init.js";
import Topbar from "~/components/Bars/Topbar.vue";
import Sidebar from "~/components/Bars/Sidebar.vue";
const Devbar = defineAsyncComponent( () => import( "~/_devmode/Devbar.vue" ) );
export default {
	"components": {
		Topbar,
		Sidebar,
		Devbar
	},
	setup () {
		const { installApp } = useInit();
		onMounted( () => installApp() );
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
