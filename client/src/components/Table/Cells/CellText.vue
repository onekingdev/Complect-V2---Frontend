<template lang="pug">
.cell-text
	template(v-if="meta.locale") {{$locale(`${meta.prefix || ""}${data}`)}}
	template(v-else) {{ data }}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": [
				Number, String
			],
			"required": true
		},
		"meta": {
			"type": Object,
			"default": () => {}
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-text
	max-width: 20em
</style>
