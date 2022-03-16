<template lang="pug">
card-container(title="Policy Details")
	template(#content v-if="policyDetail.status != 'archived'")
		c-field( label="Name" placeholder="Name" size="small" v-model="policyDetail.name")
		label
			.field-label Description
			Editor.field-body(v-model="policyDetail.description" :init="{ height: 500, plugins: [ 'advlist autoresize autolink lists link image charmap print preview anchor' ], toolbar: 'bullist numlist outdent indent | removeformat | help'}")
	template(#content v-else)
		c-field( label="Name" placeholder="Name" size="small" v-model="policyDetail.name" disabled)
		label
			.field-label Description
			div(v-html="policyDetail.description")

</template>
<script>
import { computed } from "vue";
import definitionList from "~/components/Misc/DefinitionList.vue";
export default {
	"components": { definitionList },
	"props": {
		"policyDetails": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	"emits": ["update:policyDetails"],
	setup ( props ) {
		const policyDetail = computed( () => props.policyDetails );
		return { policyDetail };
	}
};
</script>
<style lang="stylus" scoped>
.field-label
	font-size: 0.8em
	margin-bottom: 0.2em
	color: #666
	span.required
		color: var(--c-red)
		line-height: 1
		font-weight: bold
		margin-left: 0.2em
.field-body
	background: var(--c-bg-z2)
	box-shadow: 0 0 0 1px var(--c-border)
	border-radius: var(--v-inputs-border-radius)
	border: none
	overflow: hidden
	font-size: 0.9em
	width: 100%
	padding: 0.35em 0.5em
	outline: none
	line-height: 1.3
	min-height: 5em
	resize: vertical
	&::placeholder
		color: #999
		font-size: 0.9em
</style>
