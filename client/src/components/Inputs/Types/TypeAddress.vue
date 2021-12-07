<template lang="pug">
input(type="text" :value="value" @input="$emit('update:modelValue', $event.target.value)")
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
