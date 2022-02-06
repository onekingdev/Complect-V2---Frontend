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
	grid-template-columns: auto 0.84fr
	grid-template-rows: auto
	gap: 1em
	position: relative
	.container-list, .container-content
		max-height: 100%
	.container-list
		gap: 0.5em
		:deep(a)
			color: #343741
			align-items: center
			justify-content: space-between
			display: flex
			width: 100%
</style>
