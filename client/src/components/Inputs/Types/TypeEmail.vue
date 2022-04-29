<template lang="pug">
input(type="email" :value="value" :placeholder="placeholder" @change="updateModelValue($event.target.value)")
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
			"default": "example@email.com",
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
