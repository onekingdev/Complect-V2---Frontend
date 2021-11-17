<template lang="pug">
.cell-cost(v-if="data") ${{ data }}
</template>

<script>
export default {
	"props": {
		"data": {
			"type": Number,
			"required": true
		}
	}
};
</script>
