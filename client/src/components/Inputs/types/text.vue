<template lang="pug">
input(type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)")
</template>


<script>
export default {
	"props": {
		"modelValue": {
			"type": String,
			"required": true
		}
	},
	"emits": [
		"update:modelValue"
	]
};
</script>
