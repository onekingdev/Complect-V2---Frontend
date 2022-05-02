<template lang="pug">
span
  icon.icon(name="policy" size="huge")
  router-link(:to="`/compliance_policies/${id}`") {{ title }}
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
		const { id, title } = toRefs( props.data );

		return {
			id,
			title
		};
	}
};
</script>
<style lang="stylus" scoped>
.icon
  margin-right: 0.5em
</style>
