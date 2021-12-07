<template lang="pug">
.cell-status(v-if="data")
	c-status-badge(:data="data")
</template>


<script>
import cStatusBadge from "~/components/Misc/cStatusBadge.vue";
export default {
	"components": { cStatusBadge },
	"props": {
		"data": {
			"type": String,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.cell-status
	max-width: 10em
</style>
