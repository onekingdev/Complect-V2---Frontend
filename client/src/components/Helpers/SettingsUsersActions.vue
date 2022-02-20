<template lang="pug">
c-button(v-if="showExport" title="Export" @click="exportUsers()")
c-button(title="New User" type="primary" @click="createNewUser()")
</template>


<script>
import { inject } from "vue";
import cSelect from "~/components/Inputs/cSelect.vue";

export default {
	"components": { cSelect },
	"props": {
		"showExport": {
			"type": Boolean,
			"default": true
		}
	},
	"emits": ["update-user"],
	setup ( props, { emit }) {
		const modal = inject( "modal" );
		const handleNewUserSuccess = () => emit( "update-user" );

		const callBack = { "handleSuccess": handleNewUserSuccess };

		const createNewUser = () => modal({ "name": "cModalTeamMember", callBack });

		return { createNewUser };
	}
};
</script>
