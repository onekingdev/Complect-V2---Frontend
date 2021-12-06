<template lang="pug">
.bar.sidebar.flex-column-container(v-if="renderSidebar" :class="{collapsed: appState.collapsedSidebar}")
	.section-scrolled
		nav.menu
			.menu-section(v-for="(section, index) in sidebarNavigation" :class="{'section-collapsed': appState.collapsedSections[index]}")
				.section-header(@click="collapseSidebarSections(index)")
					icon(v-if="section.icon" :name="section.icon")
					.title {{$locale(section.title)}}
					icon.chevron(name="chevron-up")
				.section-links
					router-link.section-link(v-for="link in section.links" :to="{name: link.view}")
						.title {{$locale(link.title)}}
			
			.menu-section.border-top
				router-link.section-link.standalone-link(:to="{name: 'Settings'}")
					icon(name="settings")
					.title {{$locale('Settings')}}
			
	.section-fixed
		.menu-section
			.section-link.standalone-link.collapse-sidebar(@click="collapseSidebar(!appState.collapsedSidebar)")
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

.bar.sidebar
	font-size: 1.5rem
	display: flex
	flex-direction: column
	width: max-content
	min-height: 0
	background: var(--c-bg-sidebar)
	color: #eee
	user-select: none
	nav.menu
		padding: 1.5em 0.7em 0
	.section-fixed
		border-top: 1px solid #2e304f
		padding: 0.7em 0
		margin: 0 0.7em
		.collapse-sidebar
			svg.icon
				transform: rotate(180deg)

	svg.icon
		width: $icons-size
		height: $icons-size
		fill: #fff
		margin-right: 1em
		flex-shrink: 0
		&.icon-chevron-up
			margin-left: auto
			width: $chevron-size
			height: $chevron-size
			transition: transform var(--fx-duration-short, .15s) ease-in-out
	
	.menu-section
		+ .menu-section
			margin-top: 0.5em
		.section-header, .section-link
			display: flex
			align-items: center
			padding: 0.7em 1.3em
			padding-right: 0.4em
			cursor: pointer
			line-height: 1
			box-shadow: none
		.section-header
			font-size: 0.8em
			margin-bottom: 1em
			.title
				text-transform: uppercase
				font-weight: bold
				letter-spacing: 0.05em
				margin-right: 2em
		.section-links
			padding-bottom: 2em
			max-height: 15em
			overflow: hidden
			transition: max-height var(--fx-duration-short, .15s) ease-in-out, padding var(--fx-duration-short, .15s) ease-in-out
		
		.section-link, .standalone-link
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
				svg.icon-login
					margin-left: auto
					width: $icons-size
					height: $icons-size
		
		.standalone-link
			display: flex
			.title
				margin-right: 2em
		
		&.section-collapsed
			svg.icon-chevron-up
				transform: rotate(180deg)
			.section-links
				max-height: 0em
				padding: 0

	.border-top
		border-top: 1px solid #2e304f
		padding: 0.7em 0
	
	&.collapsed
		.collapse-sidebar
			svg.icon
				transform: rotate(0deg)
				// margin: 0em
				// margin-left: -0.4em
		.menu .menu-section
			.section-header
				border-radius: 0.4em
				.title, svg.chevron
					display: none
				&:hover
					background: #2F304F
			.section-links
				padding: 0
				a
					display: none
		.section-link svg
			margin-right: 0
		.title
			display: none
</style>
