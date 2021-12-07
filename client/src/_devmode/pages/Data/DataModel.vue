<template lang="pug">
section.data-constructor
	.data-constructor-form
		c-field(label="Title:" v-model="form.title" required)
		c-button(title="Reset" type="link" @click="reset()" :disabled="!form.title")
		c-button(v-if="!form._id" title="Create" type="primary" @click="create()" :disabled="!form.title")
		c-button(v-else title="Update" type="primary" @click="update()")
	.data-constructor-documents(v-if="Object.keys(documents).length")
		.document(v-for="document in documents" :title="document._id" :key="document._id")
			.document-title(@click="select(document._id)") {{document.title}}
			icon(name="close" @click="remove(document._id)")
	.data-constructor-footer
		.total Total: {{Object.keys(documents).length}}
		c-button(title="Test" @click="crudTest")
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
			documentsToStore,
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
		const select = _id => form.value = {...documents.value[_id]};
		const remove = _id => deleteDocuments(_id);

		
		
		const generate = async q => {
			let randomDocuments = []
			let titles = randomTitles({q, w: [1, 5]})
			titles.forEach(title => randomDocuments.push({title}));
			return await createDocuments(randomDocuments);
		}

		const crudTest = async () => {
			console.group("CRUD Test")
			try {
				let ids = await generate(500);
				await updateDocument(documents.value[ids[0]], {_id: ids[0], title: "Update 1"})
				await updateDocument(documents.value[ids[0]], {_id: ids[0], title: "Update 2"})
				await deleteDocuments(ids[0])
				await updateDocument(documents.value[ids[1]], {_id: ids[1], title: "Another Update"})
				await deleteDocuments(ids[1])
				await deleteDocuments(ids[2])
				await deleteDocuments()
			} catch(error) {
				console.error(error)
			} finally {
				console.groupEnd()
			}
			
		}

		onMounted(() => documentsToStore())
		onUnmounted(() => clearStore())
		
		return { form, documents, reset, create, update, select, remove, generate, crudTest }
	}
};
</script>


<style lang="stylus" scoped>
section + section
	margin-top: 2em
.data-constructor
	padding: 0
	overflow: hidden
	background: var(--c-bg-z2)
	border: 1px solid var(--c-border)
	border-radius: 0.5em
	&-form
		display: flex
		align-items: flex-end
		gap: 1em
		padding: 0.6em 1em 1em
		.c-field
			margin-right: auto
			flex: 1 0 auto
	&-documents
		font-size: 0.8em
		border-top: 1px solid var(--c-border)
		max-height: 15em
		overflow: scroll
		.document
			display: flex
			align-items: center
			width: 100%
			cursor: pointer
			transition: background 0.2s
			+ .document
				border-top: 1px solid #eee
			&-title
				flex: 1 0 auto
				padding: 0.5em 1em
			svg.icon
				flex-shrink: 0
				margin-right: 1em
				// padding: 0.5em 1em
			&:hover
				background: var(--c-bg-light-active)
		svg.icon
			width: 0.8em
			height: 0.8em
			fill: #999
			transition: fill 0.2s
			cursor: pointer
			+ svg.icon
				margin-left: 0.6em
			&.icon-edit
				width: 0.8em
				height: 0.8em
			&:hover
				fill: #000
	&-footer
		border-top: 1px solid var(--c-border)
		padding: 1em
		display: flex
		align-items: center
		gap: 1em
		justify-content: flex-end
		.total
			margin-right: auto

// section
// 	display: flex
// 	flex-direction: column
// 	gap: 1em
// 	.controls
// 		margin-top: 1em
// 		display: flex
// 		justify-content: flex-end
// 		gap: 0.5em
// 	&.model-result
// 		border-top: 1px solid var(--c-border)
// 	pre
// 		font-size: 0.7em
// 	.buttons
// 		display: flex
// 		gap: 1em
	
	
</style>
