<template lang="pug">
.bar.topbar
	router-link(:to="{name: 'Dashboard'}")
		icon(name="logo")
	.navigation
		.menu
			a.active Home
			a Documents
			a Reports
		.buttons
			c-button(title="Find an Expert" type="accent")
			c-button(:icons=["bell"] type="transparent")
	.user-block(@click="toggleUserDropDown()" :class="{expanded: userDropDownExpanded}")
		Avatar(:avatar="profile.avatar" :firstName="profile.first_name" :lastName="profile.last_name")
		.name {{profile.first_name}} {{profile.last_name}}
		icon(name="chevron-down")
		.dropdown-menu(v-if="userDropDownExpanded" ref="userDropDown")
			router-link(:to="{name: 'Profile'}") {{$locale("Profile")}}
			a {{$locale("Sign Out")}}
</template>

<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import useProfile from "~/store/Profile.js";
import Avatar from "~/components/Misc/Avatar.vue";
export default {
	"components": { Avatar },
	setup () {
		const { profile } = useProfile();
		const userDropDown = ref( null );
		const userDropDownExpanded = ref( false );
		const toggleUserDropDown = () => userDropDownExpanded.value = !userDropDownExpanded.value;
		onClickOutside( userDropDown, () => toggleUserDropDown() );
		return {
			profile,
			userDropDown,
			userDropDownExpanded,
			toggleUserDropDown
		};
	}
};
</script>

<style lang="stylus" scoped>
.bar.topbar
	width: 100%
	padding-left: 1em
	background: var(--c-bg-z2, #fff)
	border-bottom: 1px solid var(--c-border, #dcdee4)
	display: flex
	align-items: center
	svg.icon-logo
		width: 1.5em
		height: 1.5em
	.navigation
		display: flex
		align-items: center
		justify-content: flex-end
		flex: 1 0 auto
		.menu
			flex: 1 0 auto
			font-size: 1em
			padding: 0 2em
			@media (max-width: 800px)
				display: none
			a
				color: var(--c-text)
				+ a
					margin-left: 2em
				&.active
					color: #000
					font-weight: bold
		.buttons
			display: flex
			flex: 0 1 auto
			button
				margin-right: 0.5em
	.user-block
		position: relative
		display: flex
		padding: 1em
		margin-left: auto
		align-items: center
		box-shadow: inset 1px 0 0 0 var(--c-border, #ddd)
		transition: background var(--fx-duration-regular, .25s)
		cursor: pointer
		user-select: none
		&:hover
			background: var(--c-bg-light-hover, #f3f6f9)
		&.expanded
			svg.icon-chevron-down
				transform: rotate(180deg)
		.avatar
			margin-right: 0.7em
			flex-shrink: 0
		.name
			max-width: 7em
			white-space: nowrap
			overflow: hidden
			text-overflow: ellipsis
		svg.icon-chevron-down
			width: 0.7em
			height: 0.7em
			margin-left: 1em
			transition: transform var(--fx-duration-short, .15s)
		.dropdown-menu
			font-size: 0.9em
			position: absolute
			top: 100%
			left: 0
			width: calc(100% - 0.5em)
			background: var(--c-bg-z2, #fff)
			border: 1px solid var(--c-border, #ddd)
			border-radius: 0 0 var(--v-border-radius) var(--v-border-radius)
			overflow: hidden
			a
				display: block
				color: var(--c-text)
				padding: 0.5em 1em
				transition: background var(--fx-duration-regular, .25s)
				&:hover
					background: var(--c-bg-light-hover, #f3f6f9)
				&.router-link-exact-active
					color: var(--c-link)
					background: var(--c-bg-light-active, #ecf4ff)

</style>
