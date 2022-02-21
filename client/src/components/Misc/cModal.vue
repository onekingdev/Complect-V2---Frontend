<template lang="pug">
teleport(to="#app-container")
	transition(name="modal-fade")
		.c-modal-container(v-if="modelValue")
			.c-modal-window(ref="modalWindow" :class="{ wide }")
				.c-modal-header
					.title {{title}}
					c-button(type="icon" iconL="close" size="small" @click="closeModal()")
				.c-modal-content.grid-6(v-if="$slots.content")
					slot(name="content")
				.c-modal-footer(v-if="$slots.footer")
					slot(name="left-footer")
					c-button(title="Cancel" type="link" @click="closeModal()")
					slot(name="footer")
</template>


<script>
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
export default {
	"props": {
		"title": {
			"type": String,
			"required": true
		},
		"modelValue": Boolean,
		"visible": Boolean,
		"wide": Boolean
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const isModalVisible = ref( true );
		const modalWindow = ref( null );

		const closeModal = () => context.emit( "update:modelValue", false );
		onClickOutside( modalWindow, () => closeModal() );

		return {
			modalWindow,
			isModalVisible,
			closeModal
		};
	}
};
</script>


<style lang="stylus" scoped>
.modal-fade-enter-active,
.modal-fade-leave-active
	transition: opacity 0.25s ease
	.c-modal-window
		transition: transform 0.25s ease

.modal-fade-enter-from,
.modal-fade-leave-to
	opacity: 0
	.c-modal-window
		transform: translateY(-5em)


.c-modal-container
	width: 100%
	height: 100%
	position: absolute
	z-index: 999
	top: 0
	left: 0
	background: rgba(#000,0.5)
	display: flex

.c-modal-window
	margin: auto
	width: 30em
	background: var(--c-bg-z2, #fff)
	border-radius: 0.3em
	&.wide
		width: 80%

.c-modal-header
	border-bottom: 1px solid var(--c-border)
	padding: 1em
	display: flex
	align-items: center
	.title
		font-size: 1.2em
		line-height: 1.3
	.c-button
		margin-left: auto

.c-modal-content
	padding: 1em 1em 2.5em

.c-modal-footer
	display: flex
	gap: 1em
	justify-content: flex-end
	border-top: 1px solid var(--c-border)
	padding: 1em
</style>
