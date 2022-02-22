<template lang="pug">
.market-container.grid-6
	.market-filter.col-1
		slot(name="content")
	.market-content.col-5(v-if="$slots.content")
		slot(name="content")
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": "",
			"required": false
		}
	}
};
</script>


<style lang="stylus" scoped>
.market-container
	width: 100%
	.market-filter
		
	.market-content
		border-top: 1px solid var(--c-border)
		padding: 1.5em
</style>
