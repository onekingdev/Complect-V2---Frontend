<template lang="pug">
.layout.layout-authenticated
	toasts-container
	transition(appear name="pushTop")
		TopBar
	transition(appear name="pushLeft")
		SideBar
	main
		router-view
</template>


<script>
// promt for App Update
// import { inject, onMounted } from "vue";
// import useNotifications from "~/store/Notifications.js";
// import { useRegisterSW } from "virtual:pwa-register/vue";
import ToastsContainer from "~/components/Containers/ToastsContainer.vue";
import TopBar from "~/components/Bars/TopBar.vue";
import SideBar from "~/components/Bars/SideBar.vue";
export default {
	"components": {
		ToastsContainer,
		TopBar,
		SideBar
	}
	// promt for App Update
	// setup() {
	// 	const toast = inject('toast');
	// 	const { deleteNotification } = useNotifications();
	// 	const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

	// 	const cancelUpdate = async() => {
	// 		offlineReady.value = false;
	// 		needRefresh.value = false;
	// 		deleteNotification("update-app-toast");
	// 	}

	// 	onMounted(() => {
	// 		if(needRefresh.value) {
	// 			toast({
	// 				id: "update-app-toast",
	// 				type: "info",
	// 				title: "New version available",
	// 				message: "Please update application",
	// 				autoClose: false,
	// 				actions: [
	// 					{title: "Dismiss", type: "icon", method: cancelUpdate},
	// 					{title: "Update", method: updateServiceWorker}
	// 				]
	// 			})
	// 		}
	// 	});
	// }
};
</script>


<style lang="stylus" scoped>
.layout.layout-authenticated
	width: 100%
	height: 100%
	display: grid
	grid-template-columns: auto 1fr
	grid-template-rows: max-content auto max-content
	position: relative
	.bar.topbar
		grid-column: 1/-1
		position: sticky
		top: 0
		z-index: 3
	.bar.sidebar
		z-index: 2
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
		+ main
			grid-column: span 1
	.bar.devbar
		z-index: 10
		grid-column: 1/-1
	main
		background: var(--c-bg-z1)
		z-index: 1
		max-height: 100%
		overflow-y: scroll
		overflow-x: hidden
		grid-column: span 2
</style>
