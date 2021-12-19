<template lang="pug">
.layer.layer-error
	.code(v-if="code") {{code}}
	h1(v-if="title") {{title}}
	p(v-if="message") {{message}}
</template>


<script>
export default {
	"props": {
		"code": {
			"type": [
				Number, String
			],
			"default": ""
		},
		"title": {
			"type": String,
			"default": "Something go wrong"
		},
		"message": {
			"type": String,
			"default": ""
		}
	}
};
</script>


<style lang="stylus" scoped>
.layer.layer-error
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	height: 100%
	background: var(--c-bg-z2)
	padding: 2em
	.code
		color: var(--c-dimmed-light)
		font-size: 8em
		font-weight: 900
		line-height: 1
	h1
		line-height: 1.2
		font-size: 1.3em
		font-weight: 700
		margin: 1em 0
</style>
