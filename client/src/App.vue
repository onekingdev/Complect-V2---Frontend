<template lang="pug">
icons-set
Toast(message="Hello World!")
.app-container
	router-view
</template>

<script>
import IconsSet from "~/components/Icons/IconsSet.vue";
import Toast from "~/components/Misc/Toast.vue";
export default {
	components: {
		IconsSet,
		Toast
	}
};
</script>
