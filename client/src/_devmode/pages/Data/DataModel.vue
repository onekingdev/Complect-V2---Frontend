<template lang="pug">
c-card(:maxWidth="700")
	template(#header-controls)
		c-field(v-model="form.title" fullwidth required)
		c-button(title="Reset" type="link" @click="reset()" :disabled="!form.title")
		c-button(v-if="!form._id" title="Create" type="primary" @click="create()" :disabled="!form.title")
		c-button(v-else title="Update" type="primary" @click="update()")
			
	template(#content)
		.data-constructor-documents(v-if="Object.keys(documents).length")
			.document(v-for="document in documents" :title="document._id" :key="document._id")
				.document-title(@click="select(document._id)") {{document.title}}
				icon(name="close" @click="remove(document._id)")
			
	template(#footer)
		.total Total: {{Object.keys(documents).length}}
		c-button(title="CRUD Test" @click="crudTest(100)")
		c-button(title="Generate" @click="generate(10)")
		c-button(v-if="Object.keys(documents).length" title="Delete All" type="danger" @click="remove(), reset()")
</template>


<script>
import { ref, onMounted, onUnmounted } from "vue"
import useData from "~/store/Data.js"
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
export default {
	setup() {
		const {
			readDocuments,
			clearStore,
			documents,
			createDocuments,
			updateDocument,
			deleteDocuments } = useData('_devmode')

		const inititalForm = {title: ""}
		const form = ref({title: ""})

		const reset = () => form.value = {...inititalForm};
		const create = () => { createDocuments([form.value]), reset() };
		const update = () => { updateDocument(form.value._id, form.value), reset() };
		const select = _id => form.value = documents.value.find(document => document._id === _id);
		const remove = _id => deleteDocuments(_id);

		
		
		const generate = async q => {
			let randomDocuments = [];
			let titles = randomTitles({q, w: [1, 5]});
			titles.forEach(title => randomDocuments.push({title}));
			return await createDocuments(randomDocuments);
		}

		// CRUD Test. Generate n-records, save them, update and delete
		const crudTest = async q => {
			try {
				await generate(q);
				await updateDocument(documents.value[0]._id, {title: "Update 1"});
				await updateDocument(documents.value[0]._id, {title: "Update 2"});
				await deleteDocuments(documents.value[0]._id);
				await updateDocument(documents.value[0]._id, {title: "Another Update"});
				await deleteDocuments(documents.value[0]._id);
				await deleteDocuments(documents.value[0]._id);
				await deleteDocuments();
			} catch(error) {
				console.error(error)
			}
		}

		onMounted(() => readDocuments())
		onUnmounted(() => clearStore())
		
		return { form, documents, reset, create, update, select, remove, generate, crudTest }
	}
};
</script>


<style lang="stylus" scoped>
.data-constructor-documents
	font-size: 0.8em
	max-height: 25em
	overflow: scroll
	user-select: none
	.document
		display: flex
		align-items: center
		width: 100%
		cursor: pointer
		transition: background 0.2s
		padding: 0.2em 1em
		+ .document
			border-top: 1px solid #eee
		&-title
			flex: 1 0 auto
			padding: 0.5em 0
		svg.icon
			flex-shrink: 0
			width: 0.8em
			height: 0.8em
			fill: #999
			transition: fill 0.2s
			cursor: pointer
			&:hover
				fill: #000
		&:hover
			background: var(--c-bg-light-active)

:deep(.c-card-footer)
	.total
		margin-right: auto
</style>
