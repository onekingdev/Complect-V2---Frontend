<template lang="pug">
input(type="number" :value="value" @change="updateModelValue($event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": Number,
			"default": null,
			"required": false
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const updateModelValue = value => context.emit( "updateValue", parseInt( value, 10 ) );
		return { updateModelValue };
	}
};
</script>
