<template lang="pug">
label.c-input.c-checkbox
	input(type="checkbox" :checked="modelValue" @change="update")
	.title(v-if="title") {{title}}
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": ""
		},
		"modelValue": Boolean
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props, context ) {
		const update = event => context.emit( "update:modelValue", event.target.checked );
		return { update };
	}
};
</script>

<style lang="stylus" scoped>
.c-checkbox
	user-select: none
	font-size: 0.9em
	line-height: 1
	display: flex
	align-items: center
	.title
		margin-left: 0.5em
</style>
