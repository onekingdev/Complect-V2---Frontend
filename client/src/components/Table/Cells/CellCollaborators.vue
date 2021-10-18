<template lang="pug">
.cell-collaborators(v-if="data.length")
	.avatar(v-for="user in data") {{ user }}
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
</style>
