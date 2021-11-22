<template lang="pug">
.bar.sidebar(v-if="renderSidebar" :class="{collapsed: appState.collapsedSidebar}")
	nav.menu
		.section(v-for="(section, index) in sidebarNavigation" :class="{'section-collapsed': appState.collapsedSections[index]}")
			.section-header(@click="collapseSidebarSections(index)")
				icon(v-if="section.icon" :name="section.icon")
				.title {{$locale(section.title)}}
				icon.chevron(name="chevron-up")
			.links
				router-link.section-link(v-for="link in section.links" :to="{name: link.view}")
					.label {{$locale(link.title)}}

	.section-link.standalone-link.collapse-sidebar(@click="collapseSidebar(!appState.collapsedSidebar)")
		.label {{$locale("Collapse Menu")}}
		icon(name="login")

</template>


<script>
// import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { appState, collapseSidebar, collapseSidebarSections } from "~/store/appState.js";
import useNavigation from "~/store/Navigation";
export default {
	setup () {
		const { sidebarNavigation } = useNavigation();
		const route = useRoute();

		// render sidebar, depend on route meta (true by default)
		const renderSidebar = computed( () => {
			if ( "sidebar" in route.meta ) return route.meta.sidebar; // check in sidebar key persist in meta object
			return true;
		});

		// collapse sidebar when window's with is too small
		// let windowWidth = ref(window.innerWidth)
		// const onWidthChange = () => windowWidth.value = window.innerWidth
		// onMounted(() => window.addEventListener('resize', onWidthChange))
		// onUnmounted(() => window.removeEventListener('resize', onWidthChange))
		// watch(windowWidth,() => {
		// 	if (windowWidth.value < 960 && !appState.value.collapsedSidebar) collapseSidebar(true)
		// 	if (windowWidth.value > 960 && appState.value.collapsedSidebar) collapseSidebar(false)
		// })


		return {
			appState,
			sidebarNavigation,
			renderSidebar,
			collapseSidebar,
			collapseSidebarSections
		};
	}
};
</script>


<style lang="stylus" scoped>
.bar.sidebar
	font-size: 1.5rem
	padding: 1.5em 0.7em
	background: var(--c-bg-sidebar)
	color: #eee
	width: max-content
	user-select: none
	display: flex
	flex-direction: column
	.collapse-sidebar svg.icon
		transform: rotate(180deg)


	.section + .section
		margin-top: 0.5em


	.section
		.links
			padding-bottom: 2em
			max-height: 10em
			overflow: hidden
			transition: max-height var(--fx-duration-short, .15s) ease-in-out, padding var(--fx-duration-short, .15s) ease-in-out
		&.section-collapsed
			svg.icon-chevron-up
				transform: rotate(180deg)
			.links
				max-height: 0em
				padding: 0

	svg.icon
		width: 1.2em
		height: 1.2em
		fill: #fff
		margin-right: 1em
		flex-shrink: 0
		&.icon-chevron-up
			margin-left: auto
			width: 0.8em
			height: 0.8em
			transition: transform var(--fx-duration-short, .15s) ease-in-out

	.section-header, .section-link
		padding: 0.7em 1.3em
		padding-right: 0.4em
		cursor: pointer
		line-height: 1

	.section-header
		font-size: 0.8em
		margin-bottom: 1em
		display: flex
		align-items: center
		.title
			text-transform: uppercase
			font-weight: bold
			letter-spacing: 0.05em
			margin-right: 2em


	.section-link
		display: block
		color: #eee
		border-radius: 0.4em
		transition: background .2s ease-in
		+ .section-link
			margin-top: 0.5em
		&.router-link-active, &:hover
			color: #fff
			background: #2F304F
		&:hover
			color: #fff
		&.collapse-sidebar
			display: flex
			align-items: center
			margin-top: auto
			svg.icon
				margin-left: auto
				margin-right: 0.4em
				width: 1em
				height: 1em
	&.collapsed
		.collapse-sidebar
			svg.icon
				transform: rotate(0deg)
				margin: 0em
				margin-left: -0.4em
		.menu .section
			.section-header
				border-radius: 0.4em
				.title, svg.chevron
					display: none
				&:hover
					background: #2F304F
			.links
				padding: 0
				a
					display: none
		.section-link svg
			margin-right: 0
		.label
			display: none
</style>
