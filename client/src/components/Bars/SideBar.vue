<template lang="pug">
.bar.sidebar.flex-column-container(v-if="renderSidebar" :class="{'sidebar-collapsed': appState.collapsedSidebar}")
	.section-scrolled
		nav.menu
			.menu-section(v-for="(section, index) in sidebarNavigation" :class="{'section-collapsed': appState.collapsedSections[index]}")
				.header-item(@click="collapseSidebarSections(index)")
					icon(v-if="section.icon" :name="section.icon")
					.title {{$locale(section.title)}}
					icon(name="chevron-up")
				.section-links
					router-link.link-item(v-for="link in section.links" :to="{name: link.view}")
						.title {{$locale(link.title)}}

			.menu-section.bordered
				router-link.link-item(:to="{name: 'Settings'}")
					icon(name="settings")
					.title {{$locale('Settings')}}

	.section-fixed.bordered
		.menu-section
			.link-item(@click="collapseSidebar(!appState.collapsedSidebar)")
				.title {{$locale("Collapse Menu")}}
				icon(name="login")
</template>


<script>
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

$icons-size = 1.5rem
$chevron-size = 1rem
$link-hover-color = #2F304F

.bar.sidebar
	font-size: 1em
	display: flex
	flex-direction: column
	width: max-content
	height: 100%
	min-height: 0
	background: var(--c-bg-sidebar)
	color: #eee
	user-select: none
	nav.menu
		padding: 1.5em 0.7em 0
	.section-fixed
		margin: 0 0.7em
		.collapse-sidebar
			svg.icon
				transform: rotate(180deg)
	.menu-section
		+ .menu-section
			margin-top: 0.5rem
	.section-links
		padding-bottom: 2rem
		max-height: 15em
		overflow: hidden
		transition: max-height var(--fx-duration-short, .15s) ease-in-out, padding var(--fx-duration-short, .15s) ease-in-out


	.header-item, .link-item
		display: flex
		align-items: center
		padding: 1.1rem 1rem
		line-height: 1
		cursor: pointer
	.header-item
		font-size: 0.75em
		margin-bottom: 0.5rem
		.title
			text-transform: uppercase
			font-weight: bold
			letter-spacing: 0.05em
			margin-right: 2rem
	.link-item
		font-size: 0.85em
		color: #eee
		border-radius: var(--v-border-radius)
		transition: background var(--fx-input-transition-duration) ease-in-out
		+ .link-item
			margin-top: 0.5rem
		&:hover, &.router-link-active
			color: #fff
			background: $link-hover-color
	svg.icon
		width: $icons-size
		height: $icons-size
		fill: #fff
		margin-right: 1rem
		flex-shrink: 0
		&.icon-chevron-up
			margin-left: auto
			margin-right: 0
			width: $chevron-size
			height: $chevron-size
			transition: transform var(--fx-duration-short, .15s) ease-in-out
		&.icon-login
			margin-left: auto
			margin-right: 0
			width: $icons-size
			height: $icons-size
			transform: rotate(180deg)

	.bordered
		border-top: 1px solid #2e304f
		padding: 0.7em 0

.bar.sidebar
	&.sidebar-collapsed
		.header-item
			border-radius: var(--v-border-radius)
			transition: background var(--fx-input-transition-duration) ease-in-out
			&:hover
				background: $link-hover-color
		.title, svg.icon-chevron-up
			display: none
		svg.icon
			margin: 0
			&.icon-login
				transform: rotate(0)
		.section-links
			padding: 0
			a
				display: none

	.section-collapsed
		svg.icon-chevron-up
			transform: rotate(180deg)
		.section-links
			max-height: 0em
			padding: 0

</style>
