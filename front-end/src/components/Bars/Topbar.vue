<template lang="pug">
.bar.topbar
	router-link(:to="{name: 'Dashboard'}")
		icon(name="logo")
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.bar.topbar
	width: 100%
	padding: 1em
	background: var(--c-bg-z2, #fff)
	border-bottom: 1px solid var(--c-border, #dcdee4)
	display: flex
	align-items: center
	svg.icon-logo
		width: 1.5em
		height: 1.5em
</style>
