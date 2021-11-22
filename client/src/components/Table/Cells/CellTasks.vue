<template lang="pug">
.cell-tasks(v-if="data.length") {{ data.length }}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": Array,
			"required": true
		}
	}
};
</script>
