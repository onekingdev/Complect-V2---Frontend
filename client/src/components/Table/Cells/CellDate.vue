<template lang="pug">
.cell-date(v-if="data" :class="{overdue: isOverdue}")
	icon(v-if="isOverdue" name="warning")
	| {{ formatDate(data) }}
</template>


<script>
import { computed } from "vue";
import { formatDate } from "~/core/utils.js";
export default {
	"props": {
		"data": {
			"type": Number,
			"default": () => Date.now(),
			"required": false
		},
		"meta": {
			"type": Object,
			"default": () => {},
			"required": false
		}
	},
	setup ( props ) {
		const isOverdue = computed( () => {
			if ( !props.meta || !props.meta.overdueWarning ) return false;
			return Date.now() > props.data;
		});
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
	svg.icon
		margin-right: 0.5em
	&.overdue
		color: #ad841d
</style>
