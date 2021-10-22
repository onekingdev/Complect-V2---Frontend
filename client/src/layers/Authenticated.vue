<template lang="pug">
.layout.layout-authenticated
	Topbar
	Sidebar
	main
		router-view
	Devbar
</template>

<script>
import { defineAsyncComponent, onMounted } from "vue";
import useData from "~/store/Data.js";
import Topbar from "~/components/Bars/Topbar.vue";
import Sidebar from "~/components/Bars/Sidebar.vue";
const Devbar = defineAsyncComponent( () => import( "~/components/Bars/Devbar.vue" ) );
export default {
	components: {
		Topbar,
		Sidebar,
		Devbar
	},
	setup () {
		const { dataToIndexedDb } = useData();
		onMounted( () => dataToIndexedDb() );
	}
};
</script>

<style lang="stylus" scoped>
.layout.layout-authenticated
	width: 100%
	height: 100%
	display: grid
	grid-template-columns: 18em auto
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
	.bar.devbar
		z-index: 10
		grid-column: 1/-1
	main
		background: var(--c-bg-z1)
		z-index: 1
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
</style>
