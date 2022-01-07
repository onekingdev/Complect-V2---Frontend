<template lang="pug">
.c-badge(:class="title")
	icon(v-if="icon" :name="icon")
	.title {{ $locale(title) }}
</template>


<script>
export default {
	"props": {
		"icon": {
			"type": String,
			"default": "",
			"required": false
		},
		"title": {
			"type": String,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.c-badge
	font-size: 0.8em
	background: #333
	color: #fff
	border-radius: 0.5em
	padding: 0.5em 1em
	line-height: 1
	width :100%
	display: flex
	align-items: center
	justify-content: center
	svg
		margin-right: 0.5em
	&.draft
		color: #797b7e
		background: #f6f6f8
	&.inprogress
		color: #2180c2
		background: #ecf4ff
	&.complete, &.available
		color: #1bb380
		background: #d5fbef
	&.risk0
		background: #1ab27f
		color: #fff
	&.risk1
		background: #ffc900
		color: #303132
	&.risk2
		background: #ce1938
		color: #fff
</style>
