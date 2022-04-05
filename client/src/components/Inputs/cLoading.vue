<template lang="pug">
.lds-ring(:class="[`lds-ring-${size}`]")
	div
	div
	div
	div
</template>

<script>
export default {
	"props": {
		"size": {
			"type": String,
			"default": "small"
		}
	}
};
</script>


<style lang="stylus" scoped>
.lds-ring
	display inline-block
	position relative
	div
		box-sizing border-box
		display block
		position absolute
		margin 8px
		border 13px solid #2E304F
		border-radius 50%
		animation lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
		&:nth-child(1)
			animation-delay -0.45s
		&:nth-child(2)
			animation-delay -0.3s
		&:nth-child(3)
			animation-delay -0.15s

.lds-ring-small
	width 15px
	height 15px
	border-color: transparent
	div
		left: -5px
		width 15px
		height 15px
		margin 1px
		border 3px solid #2E304F
		border-color #2E304F #ddd #ddd #ddd

.lds-ring-big
	left: -2.5em
	top: -2.5em
	div
		width 5em
		height 5em
		margin 1px
		border 7px solid #2E304F
		border-color #2E304F transparent transparent transparent

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
