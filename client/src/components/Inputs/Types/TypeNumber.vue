<template lang="pug">
input(type="number" :value="value" @input="updateModelValue($event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": Number,
			"default": 0,
			"required": true
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const updateModelValue = value => context.emit( "updateValue", parseInt( value, 10 ) );
		return { updateModelValue };
	}
};
</script>
