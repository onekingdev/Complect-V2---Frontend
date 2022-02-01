<template lang="pug">
input(type="date" :value="dateFormatted(value)" @input="updateModelValue($event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": [
				Number, String
			],
			"default": () => Date.now(),
			"required": false
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const dateFormatted = value => new Date( value || Date.now() ).toISOString().split( "T" )[0];
		const toUnix = value => new Date( value ).getTime();
		const updateModelValue = value => context.emit( "updateValue", toUnix( value ) );
		return {
			dateFormatted,
			updateModelValue
		};
	}
};
</script>
