<template lang="pug">
.c-card
	.c-card-header
		.card-title {{ $locale(title, devmode) }}
		slot(name="header-controls")
	.c-card-content(v-if="$slots.content" :class="[type]")
		slot(name="content")
	.c-card-footer(v-if="$slots.footer")
		slot(name="footer")
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"required": true
		},
		"type": {
			"type": String,
			"default": "",
			"required": false
		},
		"devmode": Boolean
	}
};
</script>


<style lang="stylus" scoped>
.c-card
	background: var(--c-bg-z2, #fff)
	border: 1px solid var(--c-border)
	border-radius: 0.3em

	.c-card-header
		line-height: 1
		padding: 1em
		border-bottom: 1px solid var(--c-border)
		display: flex
		gap: 0.5em
		align-items: center
		font-size: 1em
		.card-title
			font-size: 1.2em
			margin-right: auto

	.c-card-content
		padding: 1.5em
		&.flex-column
			display: flex
			flex-direction: column
			gap: 1em
			align-items: center
		&.grid-6
			display: grid
			grid-template-columns: repeat(6, auto)
			align-items: flex-end
			gap: 1em

	.c-card-footer
		display: flex
		gap: 1em
		justify-content: flex-end
		border-top: 1px solid var(--c-border)
		padding: 1em

</style>
