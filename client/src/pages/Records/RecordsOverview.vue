<template lang="pug">
.quick-access
	span.tab(@click="goToHome()") All Documents
	span.separator(v-if="selectedFolder._id") &nbsp;/&nbsp;
	span.tab(v-if="selectedFolder._id" @click="goToFolder()") {{ selectedFolder.name }}
.actions
	input(v-show="false" type="file" @change="onChange()" ref="fileInput")
	c-button(title="Upload" type="primary" @click="UploadRecord()" :loading="loading")
	c-button(title="New Folder" type="default" @click="createNewFolder()")
c-table(v-bind="{columns, documents}" @cellEvent="folderSelect")
</template>


<script>
import { ref, inject, onMounted } from "vue";
import useProfile from "~/store/Profile.js";
import UseData from "~/store/Data.js";
import { manualApi } from "~/core/api.js";
import cModalRecord from "~/components/Modals/cModalRecord.vue";
import cModalDelete from "~/components/Modals/cModalDelete.vue";
export default {
	"components": { cModalDelete, cModalRecord },
	setup () {
		const records = new UseData( "records" );
		const { profile } = useProfile();
		const notification = inject( "notification" );
		const modal = inject( "modal" );
		const selectedFolder = ref({});
		const fileInput = ref( null );
		const loading = ref( false );
		const handleClickDownload = async id => {
			try {
				const res = await manualApi({ "method": "GET", "url": `records/zipDownload/${id}` });
				window.open( res.location, "_blank" );
			} catch ( error ) {
				loading.value = false;
				console.error( error );
				notification({ "type": "error", "title": "Error", "message": "Folder has not been downloaded. Please try again." });
			}
		};
		const handleClickMoveTo = id => {
			const folderId = selectedFolder.value._id ? selectedFolder.value._id : "root";
			modal({ "name": "cModalRecordMoveTo", id, folderId });
		};
		const UploadRecord = () => fileInput.value.click();
		const onChange = async () => {
			loading.value = true;
			try {
				const file = fileInput.value.files[0];
				const formData = new FormData();
				const folderId = selectedFolder.value._id ? selectedFolder.value._id : "root";
				formData.append( "file", file );
				formData.append( "collection", "records" );
				formData.append( "folderId", folderId );
				const uploadRes = await manualApi({ "method": "POST", "url": "upload", "data": formData });
				const newFile = ref({
					"name": file.name,
					"status": "file",
					"owner": `${profile.value.firstName} ${profile.value.lastName}`,
					"ownerId": profile.value._id,
					"size": file.size,
					"dateCreated": Date.now(),
					"lastModified": Date.now(),
					"link": uploadRes.Location,
					folderId,
					"key": uploadRes.key
				});
				await records.createDocuments([newFile.value]);
				if ( selectedFolder.value._id ) await records.updateDocument( selectedFolder.value._id, { "size": selectedFolder.value.size + file.size });
				loading.value = false;
				records.readDocuments( "", { folderId });
				notification({ "type": "success", "title": "Success", "message": "File has been uploaded.." });
			} catch ( error ) {
				loading.value = false;
				console.error( error );
				notification({ "type": "error", "title": "Error", "message": "Folder has not been uploaded. Please try again." });
			}
		};
		const createNewFolder = () => {
			const folderId = selectedFolder.value._id ? selectedFolder.value._id : "root";
			modal({ "name": "cModalRecord", folderId, "folderKey": selectedFolder.value._id ? selectedFolder.value.key : "" });
		};
		const handleClickEdit = id => modal({ "name": "cModalRecord", id, "folderKey": selectedFolder.value._id ? selectedFolder.value.key : "" });
		const handleClickDelete = id => {
			const index = records.getDocuments().value.findIndex( item => item._id === id );
			const title = records.getDocuments().value[index].status === "folder" ? "Folder" : "File";
			const description = `Removing this ${records.getDocuments().value[index].status} will delete any progress and tasks associated with the ${records.getDocuments().value[index].status}.`;
			modal({ "name": "cModalDelete", id, title, description, "collection": "records", "ownerId": records.getDocuments().value[index].ownerId });
		};
		const folderSelect = id => {
			const index = records.getDocuments().value.findIndex( item => item._id === id );
			selectedFolder.value = records.getDocuments().value[index];
			records.readDocuments( "", { "folderId": selectedFolder.value._id });
		};
		const goToHome = () => {
			records.readDocuments( "", { "folderId": "root" });
			selectedFolder.value = {};
		};
		const goToFolder = () => {
			records.readDocuments( "", { "folderId": selectedFolder.value.folderId });
			if ( selectedFolder.value.folderId === "root" ) selectedFolder.value = {};
			else {
				records.readDocuments( selectedFolder.value.folderId );
				selectedFolder.value = records.getDocument().value;
			}
		};
		const columns = [
			{ "title": "Name", "key": "name", "cell": "CellRecords", "width": "55%" },
			{ "title": "Owner", "key": "owner", "cell": "CellDefault" },
			{ "title": "Size", "key": "size", "cell": "CellSize", "align": "right" },
			{ "title": "Last Modified", "key": "lastModified", "cell": "CellDate", "align": "right" },
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
			await records.readDocuments( "", { "folderId": "root" });
		});
		return {
			"documents": records.getDocuments(),
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