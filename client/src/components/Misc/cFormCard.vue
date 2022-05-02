<template lang="pug">
.c-form-card(:class="type")
	.form-card-header
		icon(:name="type")
	.form-card-content
		.form-card-title {{ title }}
		.form-card-description {{ description }}
		c-button(:title="btnTitle" type="default" iconR="chevron-right" @click="selectFormType(routeName)" fullwidth)
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
	"props": {
		"type": {
			"type": String,
			"default": "attestation"
		},
		"title": {
			"type": String,
			"default": "Title"
		},
		"description": {
			"type": String,
			"default": "Description"
		},
		"formCount": {
			"type": Number,
			"default": 0
		},
		"routeName": {
			"type": String,
			"required": true
		}
	},
	setup ( props ) {
		const router = useRouter();
		const btnTitle = computed( () => `View All (${props.formCount})` );
		const selectFormType = () => router.push({
			"name": props.routeName,
			"query": {
				"type": props.type,
				"title": props.title
			}
		});
		return { selectFormType, btnTitle };
	}
};
</script>

<style lang="stylus" scoped>
.c-form-card
	border: 1px solid #DCDEE4
	.form-card-header
		height: 10em
		display: flex
		align-items: center
		justify-content: center
		.icon
			width: 3.5em
			height: 3.5em
	.form-card-content
		padding: 1.25em
		background: white
		color: #000
		.form-card-title
			margin-bottom: 0.875em
			font-size: 1.25em
			font-weight: 600
		.form-card-description
			margin-bottom: 1.5em
			font-size: 0.875em
			line-height: 1.2em
		.c-button
			:deep(.title)
				font-weight: initial
				color: var(--c-link)
			:deep(.icon)
				fill: var(--c-link)
.attestation .form-card-header
	background: #E8FBF5
.logs .form-card-header
	background: #F0F6FF
.approval .form-card-header
	background: #FFF9EA
</style>
