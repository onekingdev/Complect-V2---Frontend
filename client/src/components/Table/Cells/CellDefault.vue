<template lang="pug">
.default {{ data }}
</template>

<script>
export default {
	props: {
		data: {
			type: [String, Number, Object, Array, Boolean],
			required: false,
			default: null
		}
	}
};
</script>

<style lang="stylus" scoped>
// .default
// 	text-align: right
</style>
