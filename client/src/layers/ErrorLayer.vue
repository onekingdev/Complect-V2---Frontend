<template lang="pug">
.error-container
	.layer.layer-error
		.code(v-if="code") {{code}}
		h1(v-if="title") {{title}}
		p(v-if="message") {{message}}
		c-button(iconL="chevron-left" title="Go Back" type="primary" @click="goBackPage()")
</template>

<script>
import { useRouter } from "vue-router";
export default {
	"props": {
		"code": {
			"type": [
				Number, String
			],
			"default": ""
		},
		"title": {
			"type": String,
			"default": "Something go wrong"
		},
		"message": {
			"type": String,
			"default": ""
		}
	},
	setup () {
		const router = useRouter();
		const goBackPage = () => router.go(-1);
		return { goBackPage };
	}
};
</script>


<style lang="stylus" scoped>
.error-container
	display: flex
	align-items: center
	justify-content: center
	min-height: calc( 100vh - 8em )
	.layer.layer-error
		display: flex
		flex-direction: column
		justify-content: center
		align-items: center
		height: 100%
		background: var(--c-bg-z2)
		padding: 2em
		gap: 1em
		.code
			color: var(--c-dimmed-light)
			font-size: 7.5em
			font-weight: 700
			line-height: 1.5
		h1
			color: var(--c-black)
			line-height: 1.2
			font-size: 1.3em
			font-weight: 700
</style>
