<template lang="pug">
.avatar
	img(v-if="avatar" :src="avatar")
	.initials(v-else) {{initials}}
</template>


<script>
import { computed } from "vue";
export default {
	"props": {
		"avatar": {
			"type": String,
			"required": true
		},
		"firstName": {
			"type": String,
			"required": true
		},
		"lastName": {
			"type": String,
			"required": true
		}
	},
	setup ( props ) {
		const initials = computed( () => props.firstName.charAt( 0 ) + props.lastName.charAt( 0 ) );
		return { initials };
	}
};
</script>


<style lang="stylus" scoped>
.avatar
	background: #eee
	width: 2em
	height: 2em
	border-radius: 50%
	overflow: hidden
	display: flex
	img
		width: 100%
		height: 100%
		object-fit: cover
	.initials
		margin: auto
		text-transform: uppercase
		line-height: 1
</style>
