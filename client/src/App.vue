<template lang="pug">
icons-set
#app-container.default-theme
	notifications-container
	modals-container
	router-view
</template>


<script>
import { onMounted } from "vue";
import IconsSet from "~/components/Icons/IconsSet.vue";
import useInit from "~/core/init.js";
import NotificationsContainer from "~/components/Containers/NotificationsContainer.vue";
import ModalsContainer from "~/components/Containers/ModalsContainer.vue";

export default {
	"components": { IconsSet, NotificationsContainer, ModalsContainer },
	setup () {
		const { systemChecks } = useInit();
		onMounted( () => {
			systemChecks();
		});
	}
};
</script>
