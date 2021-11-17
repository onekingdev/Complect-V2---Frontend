<template lang="pug">
.layout.document-layout
	.page-header
		.content
			.section(v-if="section") {{section}}
			.title(v-if="title") {{ title }}
			.owner(v-if="owner") {{ owner }}
		.controls
			slot(name="controls")
	.tabs
		slot(name="tabs")
	.page-content
		slot(name="content")
</template>

<script>
export default {
	"props": {
		"section": {
			"type": String,
			"default": ""
		},
		"title": {
			"type": String,
			"default": "Title"
		},
		"owner": {
			"type": String,
			"default": ""
		}
	}
};
</script>

<style lang="stylus" scoped>
.layout.document-layout
	.page-header
		background: var(--c-bg-z2)
		padding: 2em
		display: flex
		align-items: flex-end
		justify-content: space-between
		.title
			font-size: 1.4em
		.controls
			display: flex
			gap: 1em
	:deep(.tabs)
		background: var(--c-bg-z2)
		display: flex
		gap: 2em
		padding: 1em 2em 0
		border-top: 1px solid var(--c-border)
		border-bottom: 1px solid var(--c-border)
		a
			color: #555
			padding-bottom: 0.5em
			&.router-link-exact-active
				color: #000
				border-bottom: 4px solid #fc0
	.page-content
		display: grid
		gap: 1em
		padding: 1em 2em
</style>
