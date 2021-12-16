<template lang="pug">
c-label(:title="title" :icon="icon" :image="image")
</template>


<script>
import cLabel from "~/components/Misc/cLabel.vue";
import { toRefs } from "vue";
export default {
	"components": { cLabel },
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	},
	setup ( props ) {
		const { title, icon, image } = toRefs( props.data );

		return {
			title,
			icon,
			image
		};
	}
};
</script>

