<template lang="pug">
.cell-progress
	.progress-text(:class="{completed}") {{ data.current }}/{{ data.max }}
	.progress-bar(:style="styles")
		.percent {{ percent }}
</template>


<script>
import { computed, toRefs } from "vue";
export default {
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	},
	setup ( props ) {
		const { current, max } = toRefs( props.data );
		const percent = computed( () => {
			if ( !max.value ) return 0;
			return Math.round( current.value / max.value * 100 );
		});
		const completed = computed( () => percent.value === 100 && current.value );
		const styles = { "--v-progress": `${percent.value}%` };
		return { percent, styles, completed };
	}
};
</script>


<style lang="stylus" scoped>
.cell-progress
	.progress-text
		margin-right: 0.5em
		&.completed
			color: var(--c-green)
	.progress-bar
		flex: 1
		background: var(--c-border)
		color: #fff
		border-radius: 0.25em
		line-height: 1
		padding: 0.2em 0.3em
		position: relative
		overflow: hidden
		.percent
			position: relative
			font-size: 0.9em
			z-index: 1
		&:after
			content: ""
			background: var(--c-green)
			height: 100%
			width: var(--v-progress)
			transition: width 0.6s ease
			position: absolute
			top: 0
			left: 0
</style>
