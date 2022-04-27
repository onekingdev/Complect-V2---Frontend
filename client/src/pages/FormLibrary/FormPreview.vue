<template lang="pug">
card-container(title="Form Name")
	template(#content)
		.content
			icon.empty(name="empty-state")
			.sub-title No Fields to Display
			.sub-text Drag and drop item from the form builder to begin.
</template>

<style lang="stylus" scoped>
.card-container
	width: 45em
	margin: auto
	:deep(.card-header)
		border-bottom: 1px solid var(--c-border)
		height: 4em
		.card-title
			margin: auto
	:deep(.card-content)
		padding: 2.5em
		.content
			padding: 1.25em 0
			text-align: center
	.empty
		width: 9.5em
		height: 9.5em
		padding-bottom: 1.5em
	.sub-title
		font-weight: bold
		font-size: 1.25em
		padding-bottom: 0.5em
	.sub-text
		font-size: 0.875em
</style>
