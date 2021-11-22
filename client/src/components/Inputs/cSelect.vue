<template lang="pug">
.c-input.c-select(:class="{expanded: datalist, iconify}")

	c-field(
		:type="multiple ? multiple: single"
		:label="label"
		:icons="[modelValue, 'drop-down']"
		:placeholder="placeholder"
		:required="required"
		v-model="modelValue"
		@click="datalistVisibility()"
		@blur="datalistHide()")


	.datalist(v-show="datalist" tabindex="-1")
		c-field(
			type="search"
			:icons="['search']"
			placeholder="Search..."
			v-model="query")

		.item(
			v-for="item in filteredData"
			@click="selectItem(item.value)"
			@keydown.enter="selectItem(item)"
			:class="{active: item == modelValue}"
			tabindex="0")
				icon(v-if="item.icon" :name="item.icon")
				.title(v-if="item.title && !iconify") {{item.title}}
</template>


<script>
import { computed, reactive, toRefs } from "vue";
export default {
	"props": {
		"modelValue": {
			"type": Array,
			"required": true
		},
		"label": {
			"type": String,
			"default": "",
			"required": false
		},
		"placeholder": {
			"type": String,
			"default": "",
			"required": false
		},
		"data": {
			"type": Array,
			"required": true
		},
		"multiple": Boolean,
		"required": Boolean,
		"iconify": Boolean
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props, context ) {
		const params = reactive({
			"query": "",
			"datalist": false,
			"selected": false
		});

		const filteredData = computed( () => {
			try {
				const query = String( params.query.toLowerCase().trim() );
				if ( params.selected || !query ) return props.data;
				return props.data.filter( item => item.title.toLowerCase().includes( query ) );
			} catch ( error ) {
				console.error( error );
				return false;
			}
		});

		const datalistVisibility = () => params.datalist = !params.datalist;
		const datalistHide = () => {
			params.datalist = false;
			params.query = "";
		};

		const selectItem = ( item ) => {
			params.datalist = false;
			params.query = "";
			const selected = () => props.modelValue.includes( item );
			const update = [
				...props.modelValue
			];
			if ( props.multiple ) if ( !selected() ) update.push( item );
			else update.splice( update.indexOf( item ), 1 );

			else update[0] = item;

			context.emit( "update:modelValue", update );
		};

		return {
			...toRefs( params ),
			filteredData,
			datalistVisibility,
			datalistHide,
			selectItem
		};
	}
};
</script>

<style lang="stylus" scoped>
.c-select
	position: relative
	width: 100%
	:deep(.c-field)
		// svg.icon-drop-up, svg.icon-drop-down
		svg.icon-drop-down
			width: 0.7em
			height: 0.7em
			fill: #999
			transition: transform 0.15s
	&.expanded
		:deep(.c-field)
			.field-body
				border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
			svg.icon-drop-down
				transform: rotate(180deg)
	.datalist
		position: absolute
		z-index: 1
		top: calc(100% + 0.05em)
		left: 0
		width: 100%
		color: #ccc
		max-height: 20em
		overflow: scroll
		background: #fff
		font-size: 0.9em
		border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)
		box-shadow: 0 0 0 1px var(--c-border)
		transition: max-height .25s ease-in-out, box-shadow .25s
		:deep(.c-field)
			.field-body
				position: sticky
				top: 0
				border-radius: 0
		.item
			display: flex
			align-items: center
			padding: 0.5em 0.8em
			line-height: 1.3
			cursor: pointer
			transition: background .25s
			font-size: 0.9em
			color: #222
			&:hover, &:focus
				background: var(--c-light-active)
				color: var(--c-link)
				outline: none
			svg.icon
				width: 1.2em
				height: 1.2em
				margin: 0.3em 0
				+ .title
					margin-left: 0.8em
		.no-resuls
			margin: 1em 0
			padding: 0.2em 1em
			color: #fff
	&.iconify
		.datalist .item
			padding: 0.9em
			svg.icon
				width: 1.3em
				height: 1.3em
				margin: auto
	&.focused
		z-index: 11
		.content
			border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
</style>
