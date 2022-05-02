<template lang="pug">
.c-pagination
	c-button(iconL="chevron-left" @click="togglePage(-1)" :disabled="currentPage < 2")
	c-button(v-if="currentStack" title="1" @click="toFirstPage()")
	c-button(v-if="currentStack" title="..." @click="toggleStack(-1)")
	c-button(v-for="pageNumber in calcStacks[currentStack]" :title="pageNumber+1" @click="updatePage(pageNumber+1)" :class="{primary: pageNumber+1 === currentPage}" :key="pageNumber")
	c-button(v-if="totalPages > 5 && calcStacks.length !== currentStack + 1" title="..." @click="toggleStack(1)")
	c-button(v-if="currentStack < calcStacks.length - 1" :title="totalPages" @click="toLastPage()")
	c-button(iconL="chevron-right" @click="togglePage(1)" :disabled="currentPage >= totalPages")
</template>


<script>
import { ref, computed } from "vue";
import { splitArrayToChunks } from "~/core/utils.js";
export default {
	"props": {
		"length": {
			"type": Number,
			"default": 0
		},
		"currentPage": {
			"type": Number,
			"default": 1
		},
		"perPage": {
			"type": Number,
			"default": 10
		},
		"perStack": {
			"type": Number,
			"default": 5
		},
		"infinity": Boolean
	},
	"emits": ["update:currentPage"],
	setup ( props, context ) {
		const totalPages = computed( () => Math.ceil( props.length / props.perPage ) );
		const updatePage = value => context.emit( "update:currentPage", value );

		const currentStack = ref( 0 );
		const toggleStack = value => {
			currentStack.value += value;
			updatePage( currentStack.value * props.perStack + 1 );
		};
		const calcStacks = computed( () => splitArrayToChunks([...Array( totalPages.value ).keys()], props.perStack ) );

		const togglePage = value => {
			const nextPage = props.currentPage + value;
			if ( nextPage - 1 > calcStacks.value[currentStack.value][props.perStack - 1]) toggleStack( 1 );
			else if ( nextPage - 1 < calcStacks.value[currentStack.value][0]) toggleStack( -1 );
			updatePage( nextPage );
		};

		const toFirstPage = () => {
			currentStack.value = 0;
			updatePage( 1 );
		};
		const toLastPage = () => {
			currentStack.value = calcStacks.value.length - 1;
			updatePage( totalPages.value );
		};

		return { togglePage, toFirstPage, toLastPage, totalPages, updatePage, currentStack, toggleStack, calcStacks };
	}
};
</script>


<style lang="stylus" scoped>
.c-pagination
	margin-top: 2em
	display: flex
	font-size: 0.8em
	.c-button
		border-radius: 0
		border-left: none
		min-width: 3.5em
		transition: none
		user-select: none
		&:first-of-type
			border-radius: var(--v-inputs-border-radius) 0 0 var(--v-inputs-border-radius)
		&:last-of-type
			border-radius: 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0
</style>
