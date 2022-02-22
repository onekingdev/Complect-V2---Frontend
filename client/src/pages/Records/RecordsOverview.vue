<template lang="pug">
.quick-access
	span.tab(@click="goToHome()") All Documents
	span.separator(v-if="selectedFolder._id") &nbsp;/&nbsp;
	span.tab(v-if="selectedFolder._id" @click="goToFolder()") {{ selectedFolder.title }}
.actions
	input(v-show="false" type="file" @change="onChange()" ref="fileInput")
	c-button(title="Upload" type="primary" @click="UploadRecord()" :loading="loading")
	c-button(title="New Folder" type="default" @click="createNewFolder()")
c-table(v-bind="{columns, documents}" @cellEvent="folderSelect")
</template>


<script>
import { ref, inject, onMounted } from "vue";
import useData from "~/store/Data.js";
import { manualApi } from "~/core/api.js";
import cModalRecord from "~/components/Modals/cModalRecord.vue";
import cModalDelete from "~/components/Modals/cModalDelete.vue";
export default {
	"components": { cModalDelete, cModalRecord },
	setup () {
		const { document, documents, readDocuments, createDocuments } = useData( "records" );
		const notification = inject( "notification" );
		const modal = inject( "modal" );
		const selectedFolder = ref( {} );
		const fileInput = ref( null );
		const loading = ref( false );

		const handleClickDownload = id => {
			const index = documents.value.findIndex( item => item._id === id );
			if ( documents.value[index].status === "folder" ) {
				console.log("folder download!");
			} else window.open( documents.value[index].link, "_blank" );
		}
		const handleClickMoveTo = () => console.log("Moveto record!");

		const UploadRecord = () => fileInput.value.click();
		const onChange = async () => {
			loading.value = true;
			try {
				const file = fileInput.value.files[0];
				const formData = new FormData();
				const folderId = selectedFolder.value._id ? selectedFolder.value._id : "root";
				formData.append( "file", file );
				formData.append( "folderId", folderId );
				const uploadRes = await manualApi({ "method": "POST", "url": "records/upload", "data": formData });
				const s3FileName = uploadRes.key.split('/').at(-1);
				const newFile = ref({
					"title": file.name,
					"status": "file",
					"Owner": "",
					"size": file.size,
					"dateCreated": Date.now(),
					"lastModified": Date.now(),
					"link": uploadRes.Location,
					"folderId": folderId,
					"key": selectedFolder.value._id ? `${selectedFolder.value.key}${s3FileName}` : `${s3FileName}`
				});
				await createDocuments([newFile.value]);
				loading.value = false;
				readDocuments( "", { "folderId" : folderId });
				notification({ "type": "success", "title": "Success", "message": "File has been uploaded.." });
			} catch ( error ) {
				loading.value = false;
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Folder has not been uploaded. Please try again."
				});
			}
		};
		const createNewFolder = () => {
			const folderId = selectedFolder.value._id ? selectedFolder.value._id : "root";
			modal({ "name": "cModalRecord", "folderId": folderId, "key": selectedFolder.value._id ? selectedFolder.value.key : "" });
		};
		const handleClickEdit = id => modal({ "name": "cModalRecord", id, "key": selectedFolder.value._id ? selectedFolder.value.key : "" });
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
				"cell": "CellSize",
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
			loading,
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
