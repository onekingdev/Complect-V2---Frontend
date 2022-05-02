<template lang="pug">
.cell-default {{size}}
</template>


<script>
import { ref, onMounted } from "vue";
export default {
	"props": {
		"data": {
			"type": Number,
			"default": 0,
			"required": false
		}
	},
	setup ( props ) {
		const size = ref( null );

		onMounted( () => {
			if ( props.data < 1024 ) size.value = `${props.data}B`;
			else if ( props.data > 1024 && props.data < 1024 * 1024 ) size.value = `${Math.ceil( props.data / 1024 )}KB`;
			else if ( props.data > 1024 * 1024 && props.data < 1024 * 1024 * 1024 ) size.value = `${Math.ceil( props.data / 1024 / 1024 )}MB`;
			else size.value = "huge";
		});

		return { size };
	}
};
</script>


<style lang="stylus" scoped>
.cell-default
	text-transform: capitalize
</style>
