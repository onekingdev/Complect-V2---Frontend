<template lang="pug">
table.c-table
	thead
		tr
			th(v-for="column in data.columns") {{column}}
	tbody
		tr
			td 4
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			required: true
		}
	}
};
</script>

<style lang="stylus" scoped>
// table.c-table
</style>
