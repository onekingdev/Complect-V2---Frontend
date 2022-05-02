<template lang="pug">
.cell-default {{data}}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": [
				String, Number, Array, Object
			],
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-default
	text-transform: capitalize
</style>
