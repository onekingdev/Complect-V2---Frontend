<template lang="pug">
.view.auth-view
	.top-bar
		.logo
			icon(name="logo")
			icon(name="brandname")
		c-button(title="Sign In" type="primary" @click="goToSignIn()")
	.container
		router-view
</template>


<script>
import { useRouter } from "vue-router";
export default {
	setup () {
		const router = useRouter();
		const goToSignIn = () => router.push({ "name": "AuthSignIn" });
		return { goToSignIn };
	}
};
</script>


<style lang="stylus" scoped>
.view.auth-view
	height: 100%
	display: flex
	flex-direction: column

.top-bar
	width: 100%
	display: flex
	padding: 1em 1.5em
	background: var(--c-bg-z2, #fff)
	border-bottom: 1px solid var(--c-border, #dcdee4)
	.logo
		margin-right: auto
		svg.icon-logo
			width: 2em
			height: 2em
		svg.icon-brandname
			width: 8em
			height: 1.8em
			margin-left: 0.5em
			fill: #000

.container
	background: #f6f6f8
	flex: 1
	display: flex
	padding: 2em
	:deep(.card-container)
		max-width: 35em
		margin: auto
		.card-content
			padding: 2em
			h1, h2
				text-align: center
				width: 100%
				line-height: 1
			h1
				font-size: 2em
				font-weight: 600
			h2
				font-size: 1.3em
			.form
				margin: 1em 0 0em
		.card-footer
			font-size: 0.9em
			justify-content: center
</style>
