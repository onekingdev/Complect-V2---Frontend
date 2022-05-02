<template lang="pug">
.cell-linked(v-if="data")
	icon(:name="data.type")
	.title {{data.type}}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": Object,
			"default": () => {},
			"required": false
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-linked
	max-width: 20em
	display: flex
	align-items: center
	gap: 0.5em
	.title
		text-transform: capitalize
</style>
