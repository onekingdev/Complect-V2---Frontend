<template lang="pug">
.components-constructor
	.constructor-controls
		slot(name="controls")
	.components-preview
		slot(name="preview")
	.components-code.col-full
		slot(name="code")
</template>


<style lang="stylus">
.components-constructor
	display: grid
	grid-template-columns: auto auto
	gap: 1em
	.constructor-controls
		display: grid
		grid-template-columns: repeat(6, auto)
		align-items: start
		align-content: start
		gap: 1em
		// box-shadow: 1px 0 0 0 #eee
	.components-preview
		user-select: none
		// flex: 1 0 auto
		display: grid
		grid-template-columns: auto auto
		align-items: center
		justify-content: center
		gap: 1em
		padding: 0.5em 0
		// border-radius: 1em
		// border: 1px dashed blue
		.state-label
			text-align: right
			font-size: 0.8em
	.components-code
		code
			display: block
			margin-top: 1em
			background: #eee
			color: #000
			border-radius: 0.5em
			padding: 1em 2em	
</style>
