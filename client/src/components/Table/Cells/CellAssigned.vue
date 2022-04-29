<template lang="pug">
.cell-assigned {{ data }}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": String,
			"default": "",
			"required": false
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-assigned
	max-width: 20em
</style>
