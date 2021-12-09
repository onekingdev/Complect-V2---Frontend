<template lang="pug">
.component-constructor
	.component-controls.grid-6
		slot(name="controls")
	.component-code
		slot(name="code")
	.component-preview
		slot(name="preview")
</template>


<style lang="stylus">
.component-constructor
	.component-controls
		margin-bottom: 3em
	.component-code
		width: 100%
		margin-bottom: 3em
		code
			display: block
			width: 100%
			padding: 1em
			line-height: 1.5
			background: #f1f1f1
			border-radius: 0.5em
			+ code
				margin-top: 2rem
	.component-preview
		display: flex
		flex-wrap: wrap
		gap: 1em
		justify-content: center
		margin-bottom: 2em
		.preview-item
			.state-label
				font-size: 0.7em
				margin-bottom: 0.3em
				color: var(--c-dimmed)
	
</style>
