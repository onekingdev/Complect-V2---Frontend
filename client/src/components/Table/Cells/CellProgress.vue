<template lang="pug">
.cell(v-if="current")
  | {{ current }}/{{ max }}
  div.progress
    div.progress-bar(:style="styles") {{ percent }}
</template>


<script>
import { toRefs } from "@vue/reactivity";
export default {
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	},
	setup ( props ) {
		const { current, max } = toRefs( props.data );
		const percent = current.value / max.value * 100;
		const styles = { "width": `${percent}%` };
		return {
			current,
			max,
			percent,
			styles
		};
	}
};
</script>

<style lang="stylus" scoped>
.progress
  display: flex
  width: 100%
  height: 1.1em
  margin-left: 0.5em
  overflow: hidden
  line-height: 0
  background: #e9ecef
  border-radius: 0.25em
  .progress-bar
    display: flex
    flex-direction: column
    justify-content: center
    overflow: hidden
    color: #fff
    text-align: center
    white-space: nowrap
    background-color: #28a745
    transition: width 0.6s ease
    font-size: 0.8em
</style>
