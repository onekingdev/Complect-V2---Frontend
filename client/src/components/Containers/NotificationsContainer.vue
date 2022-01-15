<template lang="pug">
transition-group(
	name="notifications"
	tag="div"
	class="notifications-container")
		c-notification(v-for="notification in notifications" v-bind="notification" :key="notification.id")
</template>


<script>
import cNotification from "~/components/Misc/cNotification.vue";
import useNotifications from "~/store/Notifications.js";
export default {
	"components": { cNotification },
	setup () {
		const { notifications } = useNotifications();
		return { notifications };
	}
};
</script>


<style lang="stylus" scoped>
.notifications-container
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
	.c-notification
		transition: transform 0.5s ease, opacity 0.5s ease
		pointer-events: auto
.notifications-enter-from
	opacity: 0
	transform: translateY(-20em)

.notifications-leave-to
	opacity: 0
	transform: translateX(20em)

.notifications-leave-active
	z-index: 1
	position: absolute
</style>
