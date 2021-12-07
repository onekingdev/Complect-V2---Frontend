<template lang="pug">
input(type="date" :value="value" @input="$emit('update:modelValue', $event.target.value)")
</template>


<script>
export default {
	"props": {
		"value": {
			"type": String,
			"required": true
		}
	},
	setup () {
		const unixTime = Date.now();
		const date = new Date( unixTime ).toISOString().split( "T" )[0];
		return { date };
	}
};
</script>
