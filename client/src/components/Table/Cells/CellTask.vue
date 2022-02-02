<template lang="pug">
.cell-task
	c-checkbox(type="round" v-model="isCompleted" @change="toggleComplete(id)")
	.title(:class="{completed: isCompleted}" @click="openTaskModal()") {{data}}
</template>


<script>
import { computed, inject } from "vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
import useData from "~/store/Data.js";
export default {
	"components": { cCheckbox },
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"data": {
			"type": String,
			"required": true
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const modal = inject( "modal" );
		const { documents, updateDocument } = useData( "tasks" );

		const openTaskModal = () => modal({ "name": "cModalTask", "id": props.id });

		const isCompleted = computed( () => {
			const document = documents.value.find( doc => doc._id === props.id );
			return Boolean( document.completedAt );
		});


		const toggleComplete = id => {
			const completed = isCompleted.value;
			try {
				if ( completed ) updateDocument( id, { "completedAt": null });
				else updateDocument( id, { "completedAt": Date.now() });
				notification({
					"title": "Success",
					"message": `Task has been marked as ${completed ? "incomplete" : "complete"}.`
				});
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": `Task has not been marked as ${completed ? "incomplete" : "complete"}. Please try again.`
				});
			}
		};


		return { documents, isCompleted, toggleComplete, openTaskModal };
	}
};
</script>


<style lang="stylus" scoped>
.cell-task
	max-width: 20em
	.c-checkbox
		margin-right: 0.5em
	.title
		color: var(--c-link)
		cursor: pointer
		&.completed
			text-decoration: line-through
	a
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
</style>
