<template lang="pug">
dl.definition-list
	template(v-for="(value, key, index)  in data" :key="index")
		dt.key {{ $locale(key) }}
		dd.value {{value}}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
dl.definition-list
	font-size: 0.85em
	line-height: 1.3
	display: grid
	gap: 0.5em 2em
	grid-template-columns: max-content 1fr
	dt.key
		color: #797b7e
</style>
