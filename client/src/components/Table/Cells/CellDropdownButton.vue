<template lang="pug">
c-dropdown(iconR="more" type="transparent")
	c-button(v-for="(item, index) in data" :key="index"  type="transparent" :title="item.title" @click="handleClickButton(item)")
</template>
<script>
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown },
	"props": {
		"data": {
			"type": Array,
			"required": true
		}
	},
	setup () {
		const handleClickButton = button => {
			if ( !button.action ) return false;
			button.action( button.data );
			return button;
		};

		return { handleClickButton };
	}
};
</script>
<style lang="stylus" scoped>
.c-dropdown
	:deep(.dropdown)
		padding: 0.5em 0
		border-radius: 5px
		top: 2.5em
		left: -100%
		min-width: 8em
	:deep(.c-button)
		padding: 0.6em 1em
		.title
			font-size: 1.2em
			color: var(--c-headers)
			font-weight: 600
</style>
