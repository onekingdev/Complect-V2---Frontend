<template lang="pug">
.file
  icon(name="file")
  .right
    .name {{ file.name }}
    a(:href="file.link") Download
  c-dropdown(iconR="more" type="transparent" wide)
    c-button(title="Delete" type="transparent")
</template>


<script>
import cDropdown from "~/components/Inputs/cDropdown.vue";

export default {
	"components": { cDropdown },
	"props": {
		"file": {
			"type": Object,
			"required": true
		}
	}
};
</script>


<style lang="stylus" scoped>
.file
  background: #ECF4FF;
  border: 1px solid #DCDEE4;
  display: flex
  padding: 1em
  svg
    width: 2em
    height: 2em
</style>
