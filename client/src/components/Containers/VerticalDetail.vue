<template lang="pug">
.verticals-detail-container
	.container-list(v-if="$slots['list']")
		slot(name="list")
	.container-content
		slot(name="content")
</template>


<script>
export default {};
</script>


<style lang="stylus" scoped>
.verticals-detail-container
	width: 100%
	height: 100%
	display: grid
	grid-template-columns: repeat(12, 1fr)
	grid-template-rows: auto
	position: relative
	.container-list
		max-height: 100%
		grid-column: span 3
		padding-right: 15px
	.container-content
		max-height: 100%
		grid-column: span 9
		padding-left: 15px
	.container-list
		gap: 0.5em
		:deep(a)
			color: #343741
			align-items: center
			justify-content: space-between
			display: flex
			width: 100%
</style>
