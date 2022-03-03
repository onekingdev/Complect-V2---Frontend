<template lang="pug">
c-label.c-input.c-field(v-bind="{label, required}" ref="selectComponent")
  .c-tree-select
    .c-body(@click="showDropdownList()")
      div.value(:class="{'placeholder': !hasValue}")
        template(v-if="hasValue") {{ selected.title }}
        template(v-else) {{ placeholder }}
      //- input(v-else type="text" :value="value" :placeholder="placeholder")
      icon.close(v-if="hasValue" name="close" @click.stop="clearValue()")
      icon(name="chevron-down")
    .items-section(v-show="isShowDropList")
      .item(v-for="(item, optionIndex) in options" @click="openItemList(optionIndex)")
        .item-label.hover
          icon(name="chevron-right" :class="{'transform': canShowOptionItem(optionIndex)}")
          label {{ item.label }}
        .children-list(v-show="canShowOptionItem(optionIndex)")
          .item-children.hover( v-for="(child, childIndex) in item.children" @click="selectItem(optionIndex, childIndex)")
            label {{ child.title }}
</template>


<script>
import { ref, computed, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import cLabel from "~/components/Misc/cLabel.vue";

export default {
	"components": { cLabel },
	"props": {
		"value": {
			"type": Object,
			"default": () => {}
		},
		"options": {
			"type": Array,
			"default": () => [],
			"required": true
		},
		"label": {
			"type": String,
			"default": ""
		},
		"placeholder": {
			"type": String,
			"default": ""
		},
		"required": Boolean
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const isShowDropList = ref( false );
		const activeItems = ref([]);
		const selected = ref( null );
		const selectComponent = ref( null );

		const hasValue = computed( () => Boolean( selected.value ) );

		const showDropdownList = () => {
			isShowDropList.value = true;
		};

		const canShowOptionItem = optionIndex => activeItems.value.includes( optionIndex );

		const hideDropdownList = () => {
			isShowDropList.value = false;
		};

		const emitValue = () => context.emit( "updateValue", selected.value );

		const openItemList = optionIndex => {
			if ( activeItems.value.includes( optionIndex ) ) {
				const index = activeItems.value.indexOf( optionIndex );
				if ( index > -1 ) activeItems.value.splice( index, 1 );
			} else activeItems.value.push( optionIndex );
		};

		const selectItem = ( index, childIndex ) => {
			const item = props.options[index];
			selected.value = { ...item.children[childIndex], "label": item.label };
			emitValue();
			hideDropdownList();
		};

		const clearValue = () => {
			selected.value = null;
			emitValue();
		};

		onClickOutside( selectComponent, () => hideDropdownList() );

		onMounted( () => {
			if ( props.value ) selected.value = props.value;
		});

		return {
			hasValue,
			selectComponent,
			selected,
			activeItems,
			isShowDropList,
			selectItem,
			showDropdownList,
			openItemList,
			clearValue,
			canShowOptionItem
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-tree-select
  .hover
    cursor: pointer
    &:hover
      background: #f0f6fe
  svg
    width: 0.7em
    height: 0.7em
    fill: #777
    flex-shrink: 0
    &.close
      cursor: pointer
      height: 0.6em
      margin-right: 0.2em
      &:hover
        fill: red
  color: var(--c-text)
  label
    font-size: 0.8em
  .c-body
    background: var(--c-bg-z2);
    box-shadow: 0 0 0 1px var(--c-border);
    border-radius: var(--v-inputs-border-radius);
    overflow: hidden;
    display: flex;
    align-items: center;
    gap: 0.3em;
    padding: 0.2em 0.5em;
    min-height: 2em;
    input, .value
      font-size: 0.9em
      width: 100%
      border: none
      outline: none
    .placeholder
      color: #999
  .items-section
    box-shadow: 0 0 0 1px var(--c-border);
    color: var(--c-text)
    border-radius: 0 0 var(--v-inputs-border-radius) var(--v-inputs-border-radius);
    width: 100%;
    max-height: 20em;
    min-height: 0;
    overflow-y: scroll
    .item
      &-label
        padding: 0.35em
        svg
          position: relative
          top: -0.1em
          left: 0.5em
          &.transform
            transform: rotate(90deg)
        label
          margin: 0 1em
      .item-children
        padding: 0.5em
        label
          margin: 0 2em
</style>
