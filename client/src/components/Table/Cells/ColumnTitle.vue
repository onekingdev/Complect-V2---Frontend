<template lang="pug">
.column-title
	.title {{ title }}
	icon(name="sort")
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}
	}
};
</script>

<style lang="stylus" scoped>
.column-title
	display: flex
	align-items: center
	gap: 0.5em
	color: var(--c-dimmed)
	font-weight: 400
	svg.icon
		width: 0.9em
		height: 0.9em
		flex-shrink: 0
</style>
