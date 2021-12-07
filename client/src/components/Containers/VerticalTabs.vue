<template lang="pug">
.verticals-tabs-container
	.container-tabs
		slot(name="tabs")
	.container-content
		slot(name="content")
</template>


<script>
export default {};
</script>


<style lang="stylus" scoped>
.verticals-tabs-container
	width: 100%
	height: 100%
	display: grid
	grid-template-columns: auto 1fr
	grid-template-rows: auto
	gap: 1em
	position: relative
	.container-tabs, .container-content
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
	.container-tabs
		display: flex
		flex-direction: column
		gap: 0.5em
		:deep(a)
			color: #343741
			padding: 0.8em 1em
			line-height: 1.2
			border-radius: var(--v-border-radius)
			transition: background var(--fx-input-transition-duration) ease-in-out
			&:hover, &.router-link-exact-active
				color: #000
				background: #dcdee4
</style>
