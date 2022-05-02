<template lang="pug">
input(type="tel" :value="telFormatted" @change="updateModelValue($event.target.value)")
</template>


<script>
import { computed } from "vue";
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
		// need to finish format and validation
		const telFormatted = computed( () => props.value );
		const updateModelValue = value => context.emit( "updateValue", parseInt( value, 10 ) );
		return {
			telFormatted,
			updateModelValue
		};
	}
};
</script>
