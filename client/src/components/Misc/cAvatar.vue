<template lang="pug">
.c-avatar(:class="[shape, size]")
	img.c-avatar-photo(v-show="loaded" :src="avatar" loading="lazy" :alt="`${firstName} ${lastName}`" @load="onImgLoad()")
	.c-avatar-initials(v-show="!loaded") {{initials}}
</template>


<script>
import { ref, computed } from "vue";
export default {
	"props": {
		"avatar": {
			"type": [
				String, Boolean
			],
			"required": false,
			"default": null
		},
		"firstName": {
			"type": String,
			"required": true
		},
		"lastName": {
			"type": String,
			"required": true
		},
		"size": {
			"type": String,
			"required": false,
			"default": "regular"
		},
		"shape": {
			"type": String,
			"required": false,
			"default": "circle"
		}
	},
	setup ( props ) {
		const loaded = ref( false );
		const initials = computed( () => props.firstName.charAt( 0 ) + props.lastName.charAt( 0 ) );
		const onImgLoad = () => loaded.value = true;
		return {
			initials,
			loaded,
			onImgLoad
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-avatar
	background: #e2e8f0
	width: 2em
	height: 2em
	overflow: hidden
	display: flex
	img.c-avatar-photo
		display: block
		width: 100%
		height: 100%
		object-fit: cover
	.c-avatar-initials
		margin: auto
		text-transform: uppercase
		line-height: 1

	// Shape
	&.circle
		border-radius: 50%
	&.rounded
		border-radius: 0.3em
	&.square
		border-radius: 0

	// Sizes
	&.tiny
		font-size: 0.8em
	&.small
		font-size: 1em
	&.regular
		font-size: 1.5em
	&.big
		font-size: 2em
	&.huge
		font-size: 3em
</style>
