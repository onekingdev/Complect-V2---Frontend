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
	gap: 1.875em
	grid-template-columns: repeat(12, 1fr)
	grid-template-rows: auto
	position: relative
	.container-list
		max-height: 100%
		min-width: 530px
		grid-column: span 12
		@media (min-width: 800px)
			grid-column: span 3
			min-width: 100px
	.container-content
		max-height: 100%
		min-width: 530px
		grid-column: span 12
		@media (min-width: 800px)
			grid-column: span 9
	.container-list
		gap: 0.5em
		:deep(a)
			color: #343741
			align-items: center
			justify-content: space-between
			display: flex
			width: 100%
</style>
