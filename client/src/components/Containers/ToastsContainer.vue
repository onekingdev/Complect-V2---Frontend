<template lang="pug">
transition-group(
	name="toast-notification"
	tag="div"
	class="toast-container")
		c-toast(v-for="notification in notifications" v-bind="notification" :key="notification.id")
</template>


<script>
import cToast from "~/components/Misc/cToast.vue";
import useNotifications from "~/store/Notifications.js";
export default {
	"components": { cToast },
	setup () {
		const { notifications } = useNotifications();
		return { notifications };
	}
};
</script>


<style lang="stylus" scoped>
.toast-container
	position: absolute
	right: 0
	z-index: 10
	padding: 0.5em
	overflow: hidden
	height: 100%
	width: 100%
	display: flex
	flex-direction: column
	align-items: flex-end
	gap: 0.5em
	pointer-events: none
	.c-toast
		transition: transform 0.5s ease, opacity 0.5s ease
		pointer-events: auto
.toast-notification-enter-from
	opacity: 0
	transform: translateY(-20em)

.toast-notification-leave-to
	opacity: 0
	transform: translateX(20em)

.toast-notification-leave-active
	z-index: 1
	position: absolute
</style>
