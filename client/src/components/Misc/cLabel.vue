<template lang="pug">
span.label(:class="[type]")
  icon.icon(v-if="iconName" :name="iconName")
  | {{ title }}
</template>
<script>
export default {
	"props": {
		"iconName": {
			"type": String,
			"default": "",
			"required": false
		},
		"title": {
			"type": String,
			"required": true
		},
		"type": {
			"type": String,
			"default": "",
			"required": false
		}
	}
};
</script>
<style lang="stylus" scoped>
.label
  display: flex
  justify-content: flex-start
  align-items: center
  padding-left: 8
  font-size: 0.9em
  width: 90px
  height: 22px
  padding: 0.3em 0.7em
  line-height: 1em
  text-align: center
  vertical-align: baseline
  border-radius: 0.25em
  &.low
    background: #1ab27f
    color: #fff
  &.medium
    background: #ffc900
    color: #303132
  &.high
    background: #ce1938
    color: #fff
  .icon
    margin-right: 0.5em
</style>
