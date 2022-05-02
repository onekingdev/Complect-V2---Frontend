<template lang="pug">
input(type="password" :value="value" :placeholder="placeholder" @input="updateModelValue($event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": String,
			"required": true
		},
		"placeholder": {
			"type": String,
			"default": "********",
			"required": false
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const updateModelValue = value => context.emit( "updateValue", value );
		return { updateModelValue };
	}
};
</script>
