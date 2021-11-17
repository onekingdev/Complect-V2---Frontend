<template lang="pug">
.components-constructor.card-style
	//- h3 Constructor
	.constructor-controls
		slot(name="controls")
	.components-preview
		slot(name="preview")
	
</template>


<style lang="stylus">
.components-constructor
	display: flex
	flex-wrap: wrap
	align-items: flex-start
	h3
		flex: 0 0 100%
	.components-preview
		user-select: none
		flex: 1 0 auto
		// display: grid
		// grid-template-columns: auto auto
		// align-items: flex-end
		// justify-content: center
		// gap: 1em
		padding: 2em 1em
		// border-radius: 1em
		// border: 1px dashed blue
		.state-label
			text-align: right
			font-size: 0.8em
	.constructor-controls
		flex: 0 0 auto
		display: grid
		grid-template-columns: repeat(6, auto)
		// align-items: flex-end
		align-items: start
		align-content: start
		gap: 1em
		box-shadow: 1px 0 0 0 #eee
		padding: 1em 2em
</style>
