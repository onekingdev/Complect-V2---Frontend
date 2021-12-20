<template lang="pug">
c-rating(:max="data.max" v-model="data.value" :readonly="true")
</template>


<script>
import cRating from "~/components/Inputs/cRating.vue";
export default {
	"components": { cRating },
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	}
};
</script>
