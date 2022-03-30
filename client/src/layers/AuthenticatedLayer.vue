<template lang="pug">
.mobile-view(:class="isMobileType ? '' : 'hide'")
	icon(name="logo")
	.title Looks like you're on a mobile device.
	.desktop(@click="goDeskTopMode()") Enter desktop site
	.content
		div This isn't available on mobile browsers.
		div For full functionality, switch to desktop.
.layout.layout-authenticated(:class="isMobileType ? 'hide' : ''")
	transition(appear name="pushTop")
		TopBar
	transition(appear name="pushLeft")
		SideBar
	main
		router-view
	dev-bar
</template>


<script>
import { ref } from "vue";
import TopBar from "~/components/Bars/TopBar.vue";
import SideBar from "~/components/Bars/SideBar.vue";
import DevBar from "~/_devmode/DevBar.vue";
export default {
	"components": {
		TopBar,
		SideBar,
		DevBar
	},
	setup () {
		const isMobileType = ref(true);
		const goDeskTopMode = () => isMobileType.value = !isMobileType.value;
		return { goDeskTopMode, isMobileType };
	}
};
</script>


<style lang="stylus" scoped>
.mobile-view
	display: flex
	flex-direction: column
	align-items: center
	margin-top: 3.125em
	text-align: center
	padding: 0 0.25em
	@media (min-width: 500px)
		display: none
	svg.icon-logo
		width: 5em
		height: 5em
	.title
		margin: 2em 0 0.5em 0
		font-size: 1.5em
		text-align: center
	.content
		font-size: 0.875em
	.desktop
		margin-bottom: 0.5em
		font-size: 0.875em
		text-decoration: underline
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
		overflow-x: hidden
		&:not(.sidebar-collapsed)
			min-width: 16.4em
		+ main
			grid-column: span 1
	.bar.devbar
		z-index: 10
		grid-column: 1/-1
	main
		background: var(--c-bg-z2)
		min-width: 600px
		max-height: 100%
		overflow-y: auto
		overflow-x: hidden
		grid-column: span 2
.layout.layout-authenticated.hide
	@media (max-width: 500px)
		display: none
.mobile-view.hide
	display: none
</style>
