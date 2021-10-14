<template lang="pug">
.bar.topbar
	router-link(:to="{name: 'Dashboard'}")
		icon(name="logo")
	.navigation
		c-button(label="Find an Expert" type="accent")
		c-button(icon="bell" type="transparent")
	.user-block
		Avatar(:user="userInfo")
		.name {{userInfo.firstName}} {{userInfo.lastName}}
		icon(name="chevron")
</template>

<script>
import useUser from "~/store/User.js";
import Avatar from "~/components/Misc/Avatar.vue";
export default {
	components: { Avatar },
	setup () {
		const { userInfo } = useUser();
		return { userInfo };
	}
};
</script>

<style lang="stylus" scoped>
.bar.topbar
	width: 100%
	padding: 0 1em
	background: var(--c-bg-z2, #fff)
	border-bottom: 1px solid var(--c-border, #dcdee4)
	display: flex
	align-items: center
	svg.icon-logo
		width: 1.5em
		height: 1.5em
	.navigation
		text-align: right
		flex: 1 0 auto
		margin-left: auto
		button
			margin-right: 0.5em
	.user-block
		display: flex
		padding: 1em
		margin-left: auto
		align-items: center
		border-left: 1px solid var(--c-border)
		.avatar
			margin-right: 0.7em
		svg.icon-chevron
			width: 0.7em
			height: 0.7em
			margin-left: 1em
			transform: rotate(180deg)
</style>
