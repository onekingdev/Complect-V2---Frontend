<template lang="pug">
.loading.lds-ring-small
	.lds-ring
		div
</template>

<style lang="stylus" scoped>
.lds-ring
	display inline-block
	position relative
	width 160px
	height 145px
	div
		box-sizing border-box
		display block
		position absolute
		width 140px
		height 140px
		margin 8px
		border 13px solid #2E304F
		border-radius 50%
		animation lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
		border-color #2E304F #ddd #ddd #ddd
		&:nth-child(1)
			animation-delay -0.45s
		&:nth-child(2)
			animation-delay -0.3s
		&:nth-child(3)
			animation-delay -0.15s

.lds-ring-small
	width 15px
	height 15px
	.lds-ring
		border-color: transparent
		div
			top: -px
			left: -5px
			width 15px
			height 15px
			margin 1px
			border 3px solid #2E304F
			border-color #2E304F #ddd #ddd #ddd

.lds-ring-stop
	div
		animation none
		border-color #2E304F #2E304F #2E304F #2E304F
		&:nth-child(1)
			transform rotate(90deg)
		&:nth-child(2)
			transform rotate(180deg)
		&:nth-child(3)
			transform rotate(270deg)

@keyframes lds-ring
	0%
		transform rotate(0deg)
	100%
		transform rotate(360deg)
</style>
