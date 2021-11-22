<template lang="pug">
c-card(title="Toast" type="flex-column" devmode)
	template(#header-controls)
		c-button(icon="refresh" type="transparent" @click="refreshToasts()" devmode)
	template(#content)
		c-toast(v-for="(toast, index) in toasts" v-bind="toast" id="index")
	template(#footer)
		c-button(title="Remove all Notifications" type="link" @click="deleteAllNotifications()" devmode)
		c-button(title="Show Notification" type="primary" @click="showRandomToast()" devmode)
</template>


<script>
import { ref, onMounted, inject } from "vue"
import cToast from "~/components/Misc/cToast.vue";
import useNotifications from "~/store/Notifications.js";
import { randomNumber } from "~/core/utils.js"
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
export default {
	components: { cToast },
	setup() {
		const toast = inject('toast')
		const toasts = ref([])
		const toastTypes = ['info', 'success', 'warning', 'error']
		const { deleteAllNotifications } = useNotifications();

		const randomToastData = type => {
			return {
				type: type || toastTypes[randomNumber(0, toastTypes.length)],
				title: randomTitles({w: [1, 4]})[0],
				message: randomTitles({w: [3, 12]})[0]
			}
		}

		const refreshToasts = () => {
			toasts.value = []
			toastTypes.forEach(type => toasts.value.push(randomToastData(type)));
		}

		const showRandomToast = () => toast(randomToastData())

		onMounted(() => refreshToasts())
		return { toasts, randomToastData, showRandomToast, deleteAllNotifications, refreshToasts }
	}
};
</script>