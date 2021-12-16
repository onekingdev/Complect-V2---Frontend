<template lang="pug">
.selected-items
	.item(v-for="item in value")
		.title {{item.title}}
		//- icon(name="close" @click="removeSelected(item.value)") // need to fix
</template>


<script>
export default {
	"props": {
		"value": {
			"type": Array,
			"required": true
		}
	}
	// need to finish removeSelected
	// "emits": ["updateValue"],
	// setup ( props, context ) {
	// 	const removeSelected = ( value ) => {
	// 		const selected = [...props.value];
	// 		const index = selected.findIndex( item => item.value === value );
	// 		selected.splice( index, 1 );
	// 		context.emit( "updateValue", selected );
	// 	};
	// 	return { removeSelected };
	// }
};
</script>


<style lang="stylus" scoped>
.selected-items
	display: flex
	flex: 1 0 auto
	flex-wrap: wrap
	gap: 0.5em
	line-height: 1.3
	.item
		display: flex
		align-items: baseline
		font-size: 0.8em
		padding: 0.3em 0.4em 0.4em
		line-height: 1
		background: var(--c-bg-light-active)
		color: var(--c-link)
		border-radius: var(--v-border-radius)
		white-space: nowrap
		svg.icon
			cursor: pointer
			width: 0.6em
			height: 0.6em
			margin-left: 0.6em
			fill: var(--c-link)
</style>
