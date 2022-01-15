<template lang="pug">
c-card(title="Notifications" type="flex-column")
	template(#header-controls)
		c-button(iconL="refresh" type="transparent" @click="refreshNotifications()")
	template(#content)
		c-notification.col-center(v-for="(notification, index) in notifications" v-bind="notification" :id="index.toString()" :key="index")
	template(#footer)
		c-button(title="Remove all Notifications" type="link" @click="deleteAllNotifications()")
		c-button(title="Show Notification" type="primary" @click="showRandomNotification()")
</template>


<script>
import { ref, onMounted, inject } from "vue"
import cNotification from "~/components/Misc/cNotification.vue";
import useNotifications from "~/store/Notifications.js";
import { randomNumber } from "~/core/utils.js"
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
export default {
	components: { cNotification },
	setup() {
		const notification = inject('notification')
		const notifications = ref([])
		const notificationTypes = ['info', 'success', 'warning', 'error']
		const { deleteAllNotifications } = useNotifications();

		const randomNotificationData = type => {
			return {
				type: type || notificationTypes[randomNumber(0, notificationTypes.length)],
				title: randomTitles({w: [1, 4]})[0],
				message: randomTitles({w: [3, 12]})[0]
			}
		}

		const refreshNotifications = () => {
			notifications.value = []
			notificationTypes.forEach(type => notifications.value.push(randomNotificationData(type)));
		}

		const showRandomNotification = () => notification(randomNotificationData())

		onMounted(() => refreshNotifications())
		return { notifications, randomNotificationData, showRandomNotification, deleteAllNotifications, refreshNotifications }
	}
};
</script>