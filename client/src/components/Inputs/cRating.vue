<template lang="pug">
.c-input.c-rating(:class="{hovered: hoveredStar, readonly}")
	icon(
		v-for="(star, index) in max" name="star"
		:key="index"
		:class="{hovered: hoveredStar > index, active: modelValue > index}"
		@click="setRating(index+1)"
		@mouseover="previewRating(index+1)"
		@mouseleave="hoveredStar = null")
</template>


<script>
import { ref } from "vue";
export default {
	"props": {
		"max": {
			"type": Number,
			"default": 5,
			"required": false
		},
		"modelValue": {
			"type": Number,
			"required": true
		},
		"readonly": Boolean
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props, context ) {
		const hoveredStar = ref( null );
		const previewRating = rating => hoveredStar.value = rating;

		const setRating = ( rating ) => {
			if ( props.readonly ) return;
			if ( rating === 1 && props.modelValue === 1 ) context.emit( "update:modelValue", 0 );
			else {
				context.emit( "update:modelValue", rating );
				hoveredStar.value = null;
			}
		};

		return {
			setRating,
			previewRating,
			hoveredStar
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-rating
	display: flex
	align-items: center
	svg.icon
		width: 2.2em
		height: 2.2em
		fill: rgba(#000,0.05)
		cursor: pointer
		padding: 0 0.2em
		transition: fill 0.15s
		&.active
			fill: var(--c-gold)
	&.hovered
		svg.icon
			&.active
				fill: rgba(#000,0.08)
			&.hovered
				fill: var(--c-gold)
	&.readonly
		pointer-events: none
</style>
