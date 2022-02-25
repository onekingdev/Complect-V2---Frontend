<template lang="pug">
c-button(title="Export" @click="exportUsers()")
c-button-modal(title="New User" modalTitle="New User" type="primary")
	template(#content)
		c-field.col-3(label="First Name" v-model="newUser.firstName" placeholder="First Name" required)
		c-field.col-3(label="Last Name" type="text" placeholder="Last Name" v-model="newUser.lastName" required)
		c-field(label="Email" type="text" placeholder="Email" v-model="newUser.email" required)
		c-select(label="Role" type="text" :data="userRoles" v-model="newUser.role")
		c-field(label="Start Date" type="date" v-model="newUser.startDate")
		c-checkbox(label="Access Person" v-model="newUser.accessPerson")
	template(#footer)
		c-button(title="Create" type="primary" @click="createNewUser()")
</template>


<script>
import { reactive } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";
export default {
	"components": { cSelect },
	"props": {
		"users": {
			"type": Array,
			"default": () => []
		}
	},
	setup () {
		const userRoles = [
			{
				"title": "No Role",
				"value": ""
			}, {
				"title": "Basic",
				"value": "basic"
			}, {
				"title": "Trusted",
				"value": "trusted"
			}, {
				"title": "Admin",
				"value": "Admin"
			}
		];

		const newUser = reactive({
			"firstName": "",
			"lastName": "",
			"email": "",
			"role": "",
			"startDate": Date.now(),
			"accessPerson": false
		});

		const createNewUser = () => {};
		const exportUsers = () => {};

		return {
			userRoles,
			newUser,
			createNewUser,
			exportUsers
		};
	}
};
</script>
