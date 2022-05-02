<template lang="pug">
transition(name="overlay-fade")
	transition-group(
		v-if="modals.length"
		name="modals"
		tag="div"
		class="modals-container")
			component.modal(v-for="modal in modals" :is="getModalComponent(modal.name)" v-bind="modal" :key="modal.modalId")
</template>


<script>
import { defineAsyncComponent } from "vue";
import useModals from "~/store/Modals.js";
export default {
	setup () {
		const { modals } = useModals();
		const getModalComponent = name => defineAsyncComponent( () => import( `../Modals/${name}.vue` ) );
		return { modals, getModalComponent };
	}
};
</script>


<style lang="stylus" scoped>
.overlay-fade-enter-active, .overlay-fade-leave-active
	transition: opacity 0.25s ease
.overlay-fade-enter-from, .overlay-fade-leave-to
	opacity: 0

.modals-enter-from, .modals-leave-to
	opacity: 0
	transform: translateY(-5em)
.modals-enter-active, .modals-leave-active
	transition: transform 0.3s ease, opacity 0.3s


.modals-container
	width: 100vw
	height: 100vh
	position: absolute
	z-index: 90
	top: 0
	left: 0
	background: rgba(#000,0.5)
	display: flex
	.modal
		margin: auto
		width: 30em
		&.wide
			width: 80%
</style>
