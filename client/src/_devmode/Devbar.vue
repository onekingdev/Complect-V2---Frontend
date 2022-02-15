<template lang="pug">
.bar.devbar(v-if="currentPage === '/tasks'")
	c-button(title="Generate" @click="generateDocuments")
	c-button(title="Remove All" @click="removeDocuments")
</template>


<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import useData from "~/store/Data.js";
import { randomTasks } from "~/_devmode/generator/components/documents/tasks.js";
export default {
	setup () {
		const { createDocuments, deleteDocuments } = useData( "tasks" );
		const route = useRoute();
		const currentPage = computed( () => route.path );
		const generateDocuments = async () => await createDocuments( randomTasks({ "q": 17 }) );
		const removeDocuments = async () => await deleteDocuments();
		return { generateDocuments, removeDocuments, currentPage };
	}
};
</script>


<style lang="stylus" scoped>
.bar.devbar
	font-size: 0.7em
	background: #111
	width: 100%
	display: flex
	gap: 1em
	padding: 1em
</style>