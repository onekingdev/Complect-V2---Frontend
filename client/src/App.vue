<template lang="pug">
icons-set
#app-container.default-theme
	toasts-container
	router-view
</template>


<script>
import { onMounted } from "vue";
import ToastsContainer from "~/components/Containers/ToastsContainer.vue";
import IconsSet from "~/components/Icons/IconsSet.vue";
import useInit from "~/core/init.js";
import useAuth from "~/core/auth.js";
export default {
	"components": {
		IconsSet,
		ToastsContainer
	},
	setup () {
		const { systemChecks } = useInit();
		const { restoreSession } = useAuth();
		onMounted( () => {
			systemChecks();
			restoreSession();
		});
	}
};
</script>
