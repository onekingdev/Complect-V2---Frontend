<template lang="pug">
.cell-role(v-if="data")
	icon(:name="`role-${data}`" size="big")
	.title {{data}}
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
.cell-role
	svg.icon
		margin-right: 0.5em
	.title
		text-transform: capitalize
</style>
