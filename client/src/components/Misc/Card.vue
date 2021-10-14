<template lang="pug">
.card
	.header
		slot(name="header")
	.content
		slot(name="content")
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.card
	background: var(--c-bg-z2, #fff)
	border: 1px solid var(--c-border)
	border-radius: 0.3em
	.header
		font-size: 1.5em
		line-height: 1
		padding: 1em
		border-bottom: 1px solid var(--c-border)
	.content
		padding: 1em
</style>
