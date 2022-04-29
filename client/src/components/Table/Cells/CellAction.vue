<template lang="pug">
.cell-action(v-if="meta" @click="meta.action(id)")
	icon(v-if="meta.icon" :name="meta.icon")
	.title(v-if="meta.title") {{meta.title}}
	.title(v-else) {{ meta.type === 'date' ? formatDate(data) : data }}
</template>


<script>
import { formatDate } from "~/core/utils.js";
export default {
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"data": {
			"type": [
				String, Number
			],
			"required": true
		},
		"meta": {
			"type": Object,
			"default": () => {},
			"required": false
		}
	},
	setup () {
		return { formatDate };
	}
};
</script>


<style lang="stylus" scoped>
.cell-action
	max-width: 20em
	display: flex
	align-items: center
	gap: 0.5em
	cursor: pointer
	color: var(--c-blue)
</style>
