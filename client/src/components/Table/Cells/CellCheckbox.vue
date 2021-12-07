<template lang="pug">
label.cell-check
	c-checkbox(type="done" :value="false")
</template>


<script>
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
export default {
	"components": { cCheckbox },
	"props": {
		"data": {
			"type": String,
			"required": true
		},
		"type": {
			"type": String,
			"default": "check",
			"required": false
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-check
	max-width: 10em
</style>
