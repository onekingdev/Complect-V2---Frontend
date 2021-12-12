<template lang="pug">
input(type="date" :value="value" @input="$emit('update:modelValue', $event.target.value)")
//- input(type="text" :value="formatDate(value)" disabled)
//- icon(name="date" @click="datePicker()")
//- input(type="date" :valeue="toHuman(value)" @input="$emit('update:modelValue', toUnix($event.target.value))")
</template>

<script>
// import { formatDate } from "~/core/utils";
export default {
	"props": {
		// "value": {
		// 	"type": Number,
		// 	"default": () => Date.now()
		// }
		"value": {
			"type": String,
			"default": ""
		}
	},
	"emits": ["update:modelValue"]
	// setup () {
	// 	const toHuman = value => new Date( value ).toISOString().split( "T" )[0];
	// 	const toUnix = value => new Date( value ).getTime() / 1000;
	// 	const datePicker = () => console.log( "date" );
	// 	return {
	// 		toHuman,
	// 		toUnix,
	// 		formatDate,
	// 		datePicker
	// 	};
	// }
};
</script>
