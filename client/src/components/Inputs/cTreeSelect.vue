<template lang="pug">
div {{ selected }}
.tree-select
  input(type="text" :value="value" @click="showDropdownList()")
  .items-section(v-show="isShowDropList" ref="selectComponent")
    .item(v-for="(item, optionIndex) in options" @click="openItemList(optionIndex)") {{ item.label }}
      .item-children(v-show="activeItems.includes(optionIndex)" v-for="(child, childIndex) in item.children" @click="selectItem(optionIndex, childIndex)") {{ child.title }}

</template>


<script>
import { ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

export default {
  setup() {
    const isShowDropList = ref(false);
    const activeItems = ref([]);
    const selected = ref(null);
    const options = [
      {
        label: "Projects",
        children: [
          {"title": "Sun*", "value": "1"},
          {"title": "Linkbal", "value": "2"},
          {"title": "Cowel", "value": "3"}
        ]
      }
    ]
    const selectComponent = ref( null );

    const value = computed( () => selected.value ? selected.value.title : "" ); 

    const showDropdownList = () => {
      isShowDropList.value = true;
    }

    const openItemList = (optionIndex) => {
      if (activeItems.value.includes(optionIndex)) {
        const index = activeItems.value.indexOf(optionIndex);
        if (index > -1) activeItems.value.splice(index, 1);
      } else {
        activeItems.value.push(optionIndex);
      }
    }

    const selectItem = (index, childIndex) => {
      selected.value = options[index].children[childIndex]
      hideDropdownList()
    }

    const hideDropdownList = () => {
      isShowDropList.value = false;
    }

    onClickOutside( selectComponent, () => hideDropdownList() );

    return {
      selectComponent,
      selected,
      value,
      activeItems,
      options,
      isShowDropList,
      selectItem,
      showDropdownList,
      openItemList
    }
  }
}
</script>


<style lang="stylus" scoped>
input
  width: 100%
  outline: none
.items-section
  border: 1px solid var(--c-border)
  color: var(--c-text)
  .item
    margin: 0 1em
    cursor: pointer
    font-size: 0.9em
    &:hover
      background: #ccc
    .item-children
      font-size: 0.9em
      margin: 0 1em
      cursor: pointer
</style>;