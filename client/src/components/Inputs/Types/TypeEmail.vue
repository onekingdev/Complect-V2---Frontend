<template lang="pug">
input(type="email" :value="value" @input="$emit('update:modelValue', $event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": String,
			"required": true
		}
	}
};
</script>
