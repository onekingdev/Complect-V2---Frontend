<template lang="pug">
.cell-risk-level(v-if="data || data === 0")
	c-badge(:title="`risk${data}`" icon="warning-light")
</template>


<script>
import cBadge from "~/components/Misc/cBadge.vue";
export default {
	"components": { cBadge },
	"props": {
		"data": {
			"type": Number,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-risk-level
	max-width: 10em
</style>
