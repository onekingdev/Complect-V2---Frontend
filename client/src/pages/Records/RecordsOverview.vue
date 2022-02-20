<template lang="pug">
.quick-access
	span.tab(@click="goToHome()") All Documents
	span.separator(v-if="selectedFolder._id") &nbsp;/&nbsp;
	span.tab(v-if="selectedFolder._id" @click="goToFolder()") {{ selectedFolder.title }}
.actions
	input(v-show="false" type="file" @change="onChange()" ref="fileInput")
	c-button(title="Upload" type="primary" @click="UploadRecord()")
	c-button(title="New Folder" type="default" @click="createNewFolder()")
c-table(v-bind="{columns, documents}" @cellEvent="folderSelect")
</template>


<script>
import { ref, inject, onMounted } from "vue";
import useData from "~/store/Data.js";
import cModalRecord from "~/components/Modals/cModalRecord.vue";
import cModalDelete from "~/components/Modals/cModalDelete.vue";
export default {
	"components": { cModalDelete, cModalRecord },
	setup () {
		const { document, documents, readDocuments } = useData( "records" );
		const modal = inject( "modal" );
		const selectedFolder = ref( {} );
		const fileInput = ref( null );

		const handleClickDownload = () => console.log("Download record!");
		const handleClickMoveTo = () => console.log("Moveto record!");

		const UploadRecord = () => fileInput.value.click();
		const onChange = () => { const file = fileInput.value.files[0]; }
		const createNewFolder = () => modal({ "name": "cModalRecord", "folderId": selectedFolder.value._id });
		const handleClickEdit = id => modal({ "name": "cModalRecord", id });
		const handleClickDelete = id => {
			const index = documents.value.findIndex( item => item._id === id );
			const title = documents.value[index].status === "folder" ? "Folder" : "File";
			modal({
				"name": "cModalDelete",
				id,
				"title": title,
				"description": `Removing this ${documents.value[index].status} will delete any progress and tasks associated with the ${documents.value[index].status}.`,
				"collection": "records"
			});
		};

		const folderSelect = id => {
			const index = documents.value.findIndex( item => item._id === id );
			selectedFolder.value = documents.value[index];
			readDocuments( "", { "folderId" : selectedFolder.value._id });
		};

		const goToHome = () => {
			readDocuments( "", { "folderId" : "root" });
			selectedFolder.value = {};
		};

		const goToFolder = () => {
			readDocuments( "", { "folderId" : selectedFolder.value.folderId });
			if ( selectedFolder.value.folderId === "root" ) selectedFolder.value = {};
			else {
				readDocuments( selectedFolder.value.folderId );
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
						{ "title": "Edit", "action": handleClickEdit }, { "title": "Download", "action": handleClickDownload }, { "title": "Move to", "action": handleClickMoveTo }, { "title": "Delete", "action": handleClickDelete }
					]
				}
			}
		];

		onMounted( async () => {
			await readDocuments( "", { "folderId" : "root" });
		});

		return {
			documents,
			UploadRecord,
			fileInput,
			createNewFolder,
			onChange,
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
