<template lang="pug">
.horizontal-tabs-container
	.container-tabs(v-if="$slots.tabs")
		slot(name="tabs")
	.container-content
		slot(name="content")
</template>


<style lang="stylus" scoped>
.horizontal-tabs-container
	.container-tabs
		width: 100%
		display: flex
		gap: 2em
		align-items: center
		border-bottom: 1px solid var(--c-border)
		margin-bottom: 2em
		:deep(a)
			color: #343741
			padding-bottom: 0.7em
			line-height: 1.2
			&:hover
				color: #000
			&.router-link-exact-active
				box-shadow: inset 0 -4px 0 0 var(--c-gold)
				font-weight: bold
</style>
