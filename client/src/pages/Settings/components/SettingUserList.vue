<template lang="pug">
div.setting-user-container
	div.headbar.clearfix
		c-field.float-left.search-input(type="text" placeholder="Search" iconL="search")
		div.float-right.right-bar
			c-button.float-left(v-if="!isDirectoryPage" title="Export")
			c-button-modal.float-left.new-user-btn(title="New User" modalTitle="New User" type="primary")
				template(#content)
					div.grid-6
						c-field.col-3(label="First Name" v-model="newUser.firstName" placeholder="First Name" required)
						c-field.col-3(label="Last Name" type="text" placeholder="Last Name" v-model="newUser.lastName" required)
					c-field.col-full(label="Email" type="text" placeholder="Email" v-model="newUser.email" required)
					c-field.col-full(label="Role" type="text" v-model="newUser.role" required)
						template(#icon)
							icon(name="info" size="medium" @click="showRoleModal()")
					c-field.col-full(label="Start Date" type="date" v-model="newUser.startDate")
					c-checkbox(label="Access Person" v-model="newUser.accessPerson")
				template(#footer)
					c-button(title="Create" type="primary" @click="createNewReview()")
	div.content
		role-type-modal(:isModalVisible="isShowRoleTypeModal" @updateVisibleModal="updateVisibleModal")
		c-table(:documents="docs" :columns="cols" @clickIconColumn="showRoleModal()")
</template>
<script>
import { useRoute } from "vue-router";
import { reactive, computed, ref } from "vue";
import { directoryColumns, disableColumns } from "~/data/settings/users.js";
import RoleTypeModal from "~/pages/Settings/components/RoleTypeModal.vue";

export default {
	"components": { RoleTypeModal },
	setup () {
		const route = useRoute();

		const isDirectoryPage = computed( () => route.name === "Directory" );

		const newUser = reactive({
			"firstName": "",
			"lastName": "",
			"email": "",
			"role": "",
			"startDate": "",
			"accessPerson": false
		});

		const disableDocuments = [];

		const documents = [
			{
				"name": {
					"firstName": "David",
					"lastName": "Vin",
					"email": "example@gmail.com",
					"avatarUrl": ""
				},
				"role": {
					"title": "Admin",
					"icon": {
						"name": "green_checked",
						"size": "huge"
					}
				},
				"access_person": {
					"title": "",
					"iconName": "success",
					"type": "huge"
				},
				"risk_level": {
					"title": "Low",
					"iconName": "triangle",
					"type": "low"
				},
				"start_ons": new Date().toString()
			}, {
				"name": {
					"firstName": "David",
					"lastName": "Vin",
					"email": "example@gmail.com",
					"avatarUrl": ""
				},
				"role": {
					"title": "Basic",
					"icon": {
						"name": "basic",
						"size": "huge"
					}
				},
				"access_person": {
					"title": "",
					"icon": {
						"name": "",
						"size": "huge"
					}
				},
				"risk_level": {
					"title": "Low",
					"iconName": "triangle",
					"type": "low"
				},
				"start_ons": new Date().toString()
			}, {
				"name": {
					"firstName": "David",
					"lastName": "Vin",
					"email": "example@gmail.com",
					"avatarUrl": ""
				},
				"role": {
					"title": "Admin",
					"icon": {
						"name": "admin",
						"size": "huge"
					}
				},
				"access_person": {
					"title": "",
					"icon": {
						"name": "success",
						"size": "huge"
					},
					"type": "huge"
				},
				"risk_level": {
					"title": "Low",
					"iconName": "triangle",
					"type": "low"
				},
				"start_ons": new Date().toString()
			}
		];

		const isShowRoleTypeModal = ref( false );
		const showRoleModal = () => {
			isShowRoleTypeModal.value = !isShowRoleTypeModal.value;
		};
		const updateVisibleModal = ( value ) => {
			isShowRoleTypeModal.value = value;
		};

		const cols = computed( () => isDirectoryPage.value ? directoryColumns : disableColumns );

		const docs = computed( () => isDirectoryPage.value ? documents : disableDocuments );

		return {
			isShowRoleTypeModal,
			cols,
			docs,
			newUser,
			isDirectoryPage,
			showRoleModal,
			updateVisibleModal
		};
	}
};
</script>
<style lang="stylus" scoped>
.setting-user-container
	.headbar
		.search-input
			width: 18em
		.new-user-btn
			margin-left: 0.7em
</style>
