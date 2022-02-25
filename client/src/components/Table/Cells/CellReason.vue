<template lang="pug">
.cell-reason {{data}}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": String,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-reason
	text-transform: capitalize
</style>
