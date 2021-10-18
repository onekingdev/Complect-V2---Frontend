<template lang="pug">
.cell-cost ${{ data }}
</template>

<script>
export default {
	props: {
		data: {
			type: Number,
			required: true
		}
	}
};
</script>
