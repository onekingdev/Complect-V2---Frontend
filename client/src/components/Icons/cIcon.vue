<template lang="pug">
svg.icon(:class="[`icon-${name}`, size]")
	use(:xlink:href="`#icon_${name}`")
</template>


<script>
export default {
	"props": {
		"name": {
			"type": String,
			"default": "blank"
		},
		"size": {
			"type": String,
			"default": ""
		}
	}
};
</script>


<style lang="stylus" scoped>
svg.icon
	width: 1em
	height: 1em
	fill: #777
	flex-shrink: 0
	&.tiny
		width: 0.6em
		height: 0.6em
	&.small
		width: 0.8em
		height: 0.8em
	&.big
		width: 1.5em
		height: 1.5em
	&.huge
		width: 2em
		height: 2em
</style>
