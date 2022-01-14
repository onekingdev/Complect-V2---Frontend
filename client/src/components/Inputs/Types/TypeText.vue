<template lang="pug">
input(type="text" :value="value" @change="updateModelValue($event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": String,
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


