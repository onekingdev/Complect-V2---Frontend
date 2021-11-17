<template lang="pug">
icons-set
#app-container.default-theme
	//- Toast(message="Hello World!")
	router-view
</template>

<script>
import { onMounted } from "vue";
import IconsSet from "~/components/Icons/IconsSet.vue";
// import Toast from "~/components/Misc/Toast.vue";
import useInit from "~/core/init.js";
export default {
	"components": {
		IconsSet
		// toast
	},
	setup () {
		const { systemChecks } = useInit();
		onMounted( () => systemChecks() );
	}
};
</script>
