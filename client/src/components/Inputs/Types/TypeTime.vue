<template lang="pug">
input(type="time" :value="value" @input="updateModelValue($event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": Number,
			"required": true
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const updateModelValue = value => context.emit( "updateValue", value );
		return { updateModelValue };
	}
};
</script>
