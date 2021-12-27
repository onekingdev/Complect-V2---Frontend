<template lang="pug">
icons-set
#app-container.default-theme
	router-view
</template>


<script>
import { onMounted } from "vue";
import IconsSet from "~/components/Icons/IconsSet.vue";
import useInit from "~/core/init.js";
export default {
	"components": { IconsSet },
	setup () {
		const { systemChecks } = useInit();
		onMounted( () => {
			systemChecks();
		});
	}
};
</script>
