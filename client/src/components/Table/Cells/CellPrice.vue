<template lang="pug">
.cell-price(v-if="data") ${{ data }}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": Number,
			"required": true
		}
	}
};
</script>

<style lang="stylus" scoped>
.cell-price
	text-align: right
</style>
