<template lang="pug">
input(type="tel" :value="telFormatted" @input="updateModelValue($event.target.value)")
</template>


<script>
import { computed } from "vue";
export default {
	"props": {
		"value": {
			"type": String,
			"required": true
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		// need to finish format and validation
		const telFormatted = computed( () => props.value );
		const updateModelValue = value => context.emit( "updateValue", value );
		return {
			telFormatted,
			updateModelValue
		};
	}
};
</script>
