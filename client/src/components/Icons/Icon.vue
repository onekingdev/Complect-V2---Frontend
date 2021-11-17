<template lang="pug">
svg.icon(:class="`icon-${name}`")
	use(:xlink:href="`#icon_${name}`")
</template>

<script>
export default {
	"props": {
		"name": {
			"type": String,
			"default": "blank"
		}
	}
};
</script>

<style lang="stylus" scoped>
svg.icon
	height: 1em
	width: 1em
	fill: #777
</style>
