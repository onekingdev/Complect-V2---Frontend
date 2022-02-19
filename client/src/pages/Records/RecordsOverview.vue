<template lang="pug">
.quick-access
	span.tab(@click="goToHome()") All Documents
	span.separator(v-if="selectedFolder._id") &nbsp;/&nbsp;
	span.tab(v-if="selectedFolder._id" @click="goToFolder()") {{ selectedFolder.title }}
.actions
	c-button(title="Upload" type="primary" @click="UploadRecord()")
	c-button(title="New Folder" type="default" @click="createNewFolder()")
c-table(v-bind="{columns, documents}" @cellEvent="folderSelect")
</template>


<script>
import { ref, onMounted } from "vue"
import useData from "~/store/Data.js";
export default {
	setup () {
		const { document, documents, createDocuments, readDocuments } = useData( "records" );
		const selectedFolder = ref({});

		const handleClickEdit = () => {
			console.log("Edit record!");
		};
		const handleClickDownload = () => console.log("Download record!");
		const handleClickMoveTo = () => console.log("Moveto record!");
		const toggleDeleteModal = () => console.log("Delete record!");

		const folderSelect = id => {
			const index = documents.value.findIndex( item => item._id === id );
			selectedFolder.value = documents.value[index];
			readDocuments("", {"folderId" : selectedFolder.value._id});
		};

		const goToHome = () => {
			readDocuments("", {"folderId" : "root"});
			selectedFolder.value = {};
		};

		const goToFolder = () => {
			readDocuments("", {"folderId" : selectedFolder.value.folderId});
			if ( selectedFolder.value.folderId === "root" ) selectedFolder.value = {};
			else {
				readDocuments(selectedFolder.value.folderId);
				selectedFolder.value = document.value;
			}
		};

		const columns = [
			{
				"title": "Name",
				"key": "title",
				"cell": "CellRecords",
				"width": "55%",
			},
			{
				"title": "Owner",
				"key": "owner",
				"cell": "CellDefault",
			},
			{
				"title": "Size",
				"key": "size",
				"cell": "CellDefault",
				"align": "right"
			},
			{
				"title": "Last Modified",
				"key": "lastModified",
				"cell": "CellDate",
				"align": "right"
			},
			{
				"unsortable": true,
				"cell": "CellDropdown",
				"width": "35px",
				"meta": {
					"actions": [
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Download", "action": handleClickDownload }, { "title": "Move to", "action": handleClickMoveTo }, { "title": "Delete", "action": toggleDeleteModal }
					]
				}
			}
		];

		onMounted( async () => {
			await readDocuments("", {"folderId" : "root"});
		});

		return {
			documents,
			selectedFolder,
			goToHome,
			goToFolder,
			folderSelect,
			columns
		};
	}
};
</script>


<style lang="stylus" scoped>
.quick-access
	.tab
		cursor: pointer
.actions
	margin: 1em 0
	display: flex
	gap: 1em
.minuse
	width: 1.5em
	height: 1.5em
	margin: 0 auto
</style>
