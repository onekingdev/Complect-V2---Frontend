<template lang="pug">
.c-input.c-select(:class="[{expanded: datalistVisible}, dropdownListDirection]" ref="selectComponent")
	c-field(
		:type="multiple ? 'multiselect': 'text'"
		iconR="chevron-down"
		:label="label"
		:placeholder="placeholder"
		:required="required"
		v-model="selectedObjects"
		:disabled="disabled"
		readonly
		@click="showDropdownList()")

	.dropdown-list(v-show="datalistVisible" tabindex="-1" ref="dropdownList")
		.search-section(v-if="searchable" :class="{offset}")
			c-field(type="search" iconL="search" placeholder="Search..." v-model="query")
		.items-section(ref="dropdownListItems" @scroll.native="dropdownListScrollEvent()")
			template(v-if="multiple")
				c-checkbox.item(v-for="(item, index) in filteredData" :key="index" :label="item.title" :value="item.value" v-model="selectedItems" multiple)
			template(v-else)
				.item(v-for="(item, index) in filteredData" :key="index" @click="selectItem(item)") {{item.title}}
</template>


<script>
import { onMounted, computed, ref, reactive, toRefs, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
export default {
	"props": {
		"modelValue": {
			"type": [
				String, Number, Array
			],
			"default": ""
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
		"disabled": Boolean,
		"multiple": Boolean,
		"required": Boolean,
		"searchable": Boolean
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const selectComponent = ref( null );
		const dropdownList = ref( null );
		const dropdownListItems = ref( null );
		const dropdownListDirection = ref( "drop-down" );
		const selectedItems = ref();
		const selectedObjects = ref( "" );
		const params = reactive({
			"query": "",
			"datalistVisible": false,
			"selected": false,
			"offset": false
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

		const showDropdownList = () => {
			params.datalistVisible = true;
			if ( window.innerHeight - selectComponent.value.getBoundingClientRect().bottom < 300 ) dropdownListDirection.value = "drop-up";
			else dropdownListDirection.value = "drop-down";
		};

		const hideDropdownList = () => {
			params.datalistVisible = false;
			params.query = "";
		};

		onClickOutside( selectComponent, () => hideDropdownList() );

		const dropdownListScrollEvent = () => {
			if ( dropdownListItems.value.scrollTop > 5 ) params.offset = true;
			else params.offset = false;
		};


		const selectItem = item => {
			selectedItems.value = item.value;
			hideDropdownList();
		};

		// get full selected object/s (title & value) from selected value/s
		const valuesToObjects = selected => {
			if ( props.multiple ) {
				const objects = [];
				selected.forEach( value => {
					const index = props.data.findIndex( item => item.value === value );
					objects.push( props.data[index]);
				});
				return objects;
			}
			const index = props.data.findIndex( item => item.value === selected );
			return props.data[index].title;
		};

		onMounted( () => {
			if ( !props.modelValue ) return;
			selectedItems.value = props.modelValue;
			selectedObjects.value = valuesToObjects( props.modelValue );
		});

		watch( selectedItems, selected => {
			selectedObjects.value = valuesToObjects( selected );
			context.emit( "update:modelValue", selected );
		});


		return {
			...toRefs( params ),
			selectComponent,
			filteredData,
			showDropdownList,
			hideDropdownList,
			dropdownList,
			dropdownListItems,
			dropdownListDirection,
			dropdownListScrollEvent,
			selectedItems,
			selectedObjects,
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
		cursor: pointer
		input
			cursor: pointer
		svg.icon-chevron-down
			width: 0.7em
			height: 0.7em
			fill: #999
			transition: transform 0.15s

	&.expanded
		&.drop-down
			:deep(.c-field)
				.field-body
					border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
			.dropdown-list
				border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)
				top: calc(100% + 0.05em)
				.search-section
					&.offset
						border-bottom: 1px solid var(--c-border)
		&.drop-up
			:deep(.c-field)
				.field-body
					border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius)
			.dropdown-list
				border-radius: var(--v-inputs-border-radius) var(--v-inputs-border-radius) 0 0
				bottom: calc(100% - 1.4em)
				.search-section
					order: 2
					&.offset
						border-top: 1px solid var(--c-border)
		:deep(.c-field)
			svg.icon-chevron-down
				transform: rotate(180deg)


	.dropdown-list
		position: absolute
		z-index: 1
		left: 0
		width: 100%
		max-height: 20em
		min-height: 0
		display: flex
		flex-direction: column
		color: #ccc
		overflow: scroll
		background: #fff
		box-shadow: 0 0 0 1px var(--c-border)
		transition: max-height .25s ease-in-out, box-shadow .25s
		.search-section
			flex: 1
			padding: 0.5em
			background: var(--c-bg-z2)
			:deep(.c-field)
				.field-body
					border-radius: var(--v-inputs-border-radius)
		.items-section
			flex: 1
			overflow-y: auto
			font-size: 0.9em
			.item
				display: flex
				align-items: center
				padding: 0.8em 0.8em
				line-height: 1.3
				transition: background .25s
				font-size: 0.9em
				color: var(--c-text)
				cursor: pointer
				&:hover
					background: #F0F6FE
				&.active
					background: #F0F6FE
				&.checked
					background: #F0F6FE
</style>
