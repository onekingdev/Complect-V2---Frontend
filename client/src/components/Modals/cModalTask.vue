<template lang="pug">
card-container.c-modal-task(:title="title" :class="{wide: !isNewTask}" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		.grid-6(:class="{'col-3':!isNewTask}")
			c-field(label="Task Name" v-model="form.title" required)
			c-field(label="Link" v-model="form.Link")
			c-field(label="Assignee" v-model="form.assigned")
			c-field.col-3(label="Start Date" type="date" v-model="form.startsAt" required)
			c-field.col-3(label="Due Date" type="date" v-model="form.endsAt" required)
			c-field.col-3(label="Repeats" v-model="form.repeats")
			c-field.col-3(label="On Day" v-model="form.onday")
			c-field(label="Description" type="textarea" v-model="form.description")
		c-chat.col-3(v-if="!isNewTask")

	template(#footer)
		template(v-if="!isNewTask && !form.completedAt")
			c-button.delete-button(title="Delete" type="destructive" @click="deleteTask()")
			c-button(title="Mark as Complete" @click="completeTask(Date.now())")
		template(v-if="!isNewTask && form.completedAt")
			.completed
				icon(name="success")
				.text Completed on {{formatDate(Date.now())}}
			c-button(title="Mark as Incomplete" @click="completeTask(null)")
		c-button(title="Save" type="primary" @click="saveTask()")
</template>


<script>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import useModals from "~/store/Modals.js";
import useData from "~/store/Data.js";
import cChat from "~/components/Misc/cChat.vue";
import { formatDate } from "~/core/utils.js";
import { onClickOutside } from "@vueuse/core";

export default {
	"components": { cChat },
	"props": {
		"modalId": {
			"type": String,
			"required": true
		},
		"id": {
			"type": String,
			"default": "",
			"required": false
		}
	},
	setup ( props ) {
		const notification = inject( "notification" );
		const modalWindow = ref( null );
		const { deleteModal } = useModals();
		const form = ref({});

		const { document, readDocuments, createDocuments, updateDocument, deleteDocuments } = useData( "tasks" );

		const isNewTask = computed( () => !props.id );
		const isCompleted = computed( () => form.value.completedAt );

		const title = computed( () => props.id ? form.value.title : "New Task" );


		const closeModal = () => deleteModal( props.modalId );
		onClickOutside( modalWindow, () => closeModal() );

		const createTask = async () => {
			try {
				await createDocuments([form.value]);
				notification({
					"title": "Success",
					"message": "Task has been created."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Task has not been created. Please try again."
				});
			}
		};

		const updateTask = async () => {
			try {
				await updateDocument( form.value._id, form.value );
				notification({ "title": "Success", "message": "Task has been updated." });
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Task has not been updated. Please try again."
				});
			}
		};

		const completeTask = async timestamp => {
			try {
				await updateDocument( form.value._id, { "completedAt": timestamp });
				notification({
					"title": "Success",
					"message": `Task has been marked as ${timestamp ? "complete" : "incomplete"}.`
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `Task has not been marked as ${timestamp ? "complete" : "incomplete"}. Please try again.`
				});
			}
		};

		const deleteTask = async () => {
			try {
				await deleteDocuments( props.id );
				notification({
					"title": "Success",
					"message": "Task has been deleted."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Task has not been deleted. Please try again."
				});
			} finally {
				closeModal();
			}
		};

		const saveTask = async () => {
			try {
				if ( !props.id ) await createTask();
				else if ( props.id ) await updateTask();
			} catch ( error ) {
				console.error( error );
			} finally {
				closeModal();
			}
		};


		const getData = async () => {
			await readDocuments( props.id );
			form.value = document.value;
		};


		onMounted( () => {
			if ( props.id ) getData();
		});
		onUnmounted( () => form.value = {});

		return { modalWindow, closeModal, title, form, isNewTask, isCompleted, saveTask, updateTask, completeTask, deleteTask, formatDate };
	}
};
</script>


<style lang="stylus" scoped>
.c-modal-task
	.delete-button
		margin-right: auto
	.completed
		display: flex
		align-items: center
		line-height: 1.3
		.text
			margin-left: 0.5em
			font-weight: 700
			font-size: 0.9em
</style>
