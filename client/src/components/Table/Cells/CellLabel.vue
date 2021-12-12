<template lang="pug">
c-label(:title="title" :iconName="iconName" :type="type")
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
		const { title, iconName, type } = toRefs( props.data );

		return {
			title,
			iconName,
			type
		};
	}
};
</script>

