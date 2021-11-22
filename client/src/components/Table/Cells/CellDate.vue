<template lang="pug">
.cell-date
	//- icon(v-if="isOverdue" name="warning")
	| {{ formatDate(data) }}
</template>


<script>
import { computed } from "vue";
import { formatDate } from "~/core/utils.js";
export default {
	"props": {
		"data": {
			"type": [
				Number, String
			],
			"required": true
		}
	},
	setup ( props ) {
		const isOverdue = computed( () => Date.now() > props.data );
		return {
			formatDate,
			isOverdue
		};
	}
};
</script>

<style lang="stylus" scoped>
.cell-date
	display: flex
	align-items: center
	justify-content: flex-end
	svg.icon
		margin-right: 0.5em
</style>
