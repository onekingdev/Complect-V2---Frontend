<template lang="pug">
.cell-risk-level(v-if="data || data === 0")
	.title(:class="data")
		icon.icon(:name="iconName")
		| {{ data }}
</template>


<script>
import cBadge from "~/components/Misc/cBadge.vue";
export default {
	"components": { cBadge },
	"props": {
		"data": {
			"type": String,
			"required": true
		}
	},
	setup ( props ) {
		const iconName = props.data === "medium" ? "warning" : `warning_${props.data}`;
		return { iconName };
	}
};
</script>


<style lang="stylus" scoped>
.title
	text-transform: capitalize;
	.icon
		position: relative;
		top: -0.2em;
		margin-right: 0.3em;
	&.medium
		color: var(--c-gold);
	&.high
		color: var(--c-red);
	&.low
		color: var(--c-success);
	&.total
		margin-left: -1.3em;
</style>
