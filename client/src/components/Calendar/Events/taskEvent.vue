<template lang="pug">
.event.task-event(@click="openTaskModal()" :class="[type, {overdue, completed}]")
	icon(v-if="overdue" name="warning")
	icon(name="calendar-task")
	icon(v-if="linked" :name="`calendar-${linked}`")
	.title {{title}}
</template>


<script>
import { inject } from "vue";
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
		"linked": {
			"type": String,
			"default": "",
			"required": false
		},
		"type": {
			"type": String,
			"default": "",
			"required": false
		},
		"completed": Boolean,
		"overdue": Boolean
	},
	setup ( props ) {
		const modal = inject( "modal" );
		const openTaskModal = () => modal({ "name": "cModalTask", "id": props.id });
		return { openTaskModal };
	}
};
</script>


<style lang="stylus" scoped>
.task-event
	background: #1AB27F
	&.assigned
		background: #BE30AA
</style>
