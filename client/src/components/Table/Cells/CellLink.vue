<template lang="pug">
router-link.cell-link(:to="{name: 'ProjectDetail', params: {id: link}}") {{data}}
</template>


<script>
export default {
	"props": {
		"link": {
			"type": String,
			"default": ""
		},
		"data": {
			"type": [
				String,
				Number,
				Object,
				Array,
				Boolean
			],
			"required": false,
			"default": null
		}
	}
};
</script>

<style lang="stylus" scoped>
// .default
// 	text-align: right
</style>
