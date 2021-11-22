<template lang="pug">
.status-badge(:class="data") {{ humanize(data) }}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": String,
			"required": true
		}
	},
	setup () {
		const dict = {
			"draft": "Draft",
			"inprogress": "In Progress",
			"complete": "Complete",
			"available": "Available"
		};
		const humanize = status => dict[status];
		return { humanize };
	}
};
</script>

<style lang="stylus" scoped>
.status-badge
	font-size: 0.8em
	background: #333
	color: #fff
	border-radius: 0.5em
	padding: 0.5em 1em
	line-height: 1
	text-align: center
	&.draft
		color: #797b7e
		background: #f6f6f8
	&.inprogress
		color: #2180c2
		background: #ecf4ff
	&.complete, &.available
		color: #1bb380
		background: #d5fbef
</style>
