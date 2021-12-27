<template lang="pug">
.calendar
	.grid
		.cell(v-for="i in 42" :key="i")
</template>

<style lang="stylus" scoped>
.calendar
	overflow: hidden
	.grid
		display: grid
		grid-template-columns: repeat(7, 1fr)
		grid-template-rows: repeat(6, 1fr)
		border-bottom: 1px solid var(--c-border)
		border-right: 1px solid var(--c-border)
		.cell
			padding: 2em 0
			width: 100%
			border-top: 1px solid var(--c-border)
			border-left: 1px solid var(--c-border)
</style>
