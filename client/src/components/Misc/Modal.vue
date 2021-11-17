<template lang="pug">
teleport(to="#app-container")
	transition(name="fade")
		.modal(v-if="visible")
			.modal-window
				.header
					slot(name="header")
				.content
					slot(name="content")
				.footer
					slot(name="footer")
</template>


<script>
export default { "props": { "visible": Boolean } };
</script>


<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
	transition: opacity 0.25s ease
	.modal-window
		transition: transform 0.25s ease

.fade-enter-from, .fade-leave-to
	opacity: 0
	.modal-window
		transform: translateY(-5em)


.modal
	width: 100%
	height: 100%
	position: absolute
	z-index: 999
	top: 0
	left: 0
	background: rgba(#000,0.5)
	display: flex
.modal-window
	margin: auto
	min-width: 30em
	background: var(--c-bg-z2, #fff)
	border-radius: 0.3em
	.header
		font-size: 1.3em
		line-height: 1
		border-bottom: 1px solid var(--c-border)
		padding: 1em
		display: flex
		align-items: center
		:deep(svg.icon)
			width: 1.7em
			height: 0.7em
			margin-left: auto
			cursor: pointer
			&:hover
				fill: #000
	.content
		padding: 1.5em 1em 2.5em
		display: grid
		grid-template-columns: repeat(6, auto)
		align-items: flex-end
		gap: 1em
	.footer
		display: flex
		gap: 1em
		justify-content: flex-end
		border-top: 1px solid var(--c-border)
		padding: 1em
</style>
