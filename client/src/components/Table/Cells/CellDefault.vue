<template lang="pug">
.cell-default {{data}}
</template>


<script>
export default {
	"props": {
		"data": {
			"type": [
				String, Number, Array, Object
			],
			"required": true
		}
	}
};
</script>
