<template lang="pug">
.cell.cell-price(v-if="data") ${{ data }}
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
