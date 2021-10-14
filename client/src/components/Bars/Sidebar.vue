<template lang="pug">
.bar.sidebar
	.menu
		.section(v-for="section in sidebarNavigation")
			.header
				icon(v-if="section.icon" :name="section.icon")
				.title {{section.title}}
				icon(name="chevron")
			.links
				router-link(v-for="link in section.links" :to="{name: link.view}") {{link.title}}

</template>

<script>
import useNavigation from "~/store/Navigation"
export default {
	setup () {
		const { sidebarNavigation } = useNavigation()
		return { sidebarNavigation };
	}
};
</script>

<style lang="stylus" scoped>
.bar.sidebar
	font-size: 1.5rem
	padding: 1.5em 0.7em
	background: var(--c-bg-sidebar)
	color: #eee
	.menu
		.section
			+ .section
				margin-top: 2em
			.header, .links a
				padding: 0.7em 1.3em
				padding-right: 0.4em
				cursor: pointer
				line-height: 1
				&:hover
					color: #fff
			.header
				font-size: 0.8em
				margin-bottom: 1em
				display: flex
				align-items: center
				svg.icon
					width: 1.1em
					height: 1.1em
					fill: #fff
					margin-right: 1em
					&.icon-chevron
						margin-left: auto
						width: 0.8em
						height: 0.8em
				.title
					text-transform: uppercase
					font-weight: bold
					letter-spacing: 0.05em
					margin-right: 2em
			.links
				a
					display: block
					color: #eee
					border-radius: 0.4em
					transition: background .2s ease-in
					+ a
						margin-top: 0.5em
					&.router-link-active, &:hover
						background: #2F304F
</style>
