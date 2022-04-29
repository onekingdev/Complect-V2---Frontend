<template lang="pug">
router-link(:to="{name: 'ProjectDetail', params: {id: id}}")
	.event.project-event(:class="[type, {overdue, completed}]")
		icon(name="calendar-project")
		.title {{title}}
</template>


<script>
export default {
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"title": {
			"type": String,
			"required": true
		},
		"type": {
			"type": String,
			"default": "",
			"required": false
		},
		"completed": Boolean,
		"overdue": Boolean
	}
};
</script>


<style lang="stylus" scoped>
.project-event
	background: #0479FF
</style>
