<template lang="pug">
card-container(title="Role Types" ref="modalWindow")
	template(#controls)
		c-button(type="icon" iconL="close" size="small" @click="closeModal()")
	template(#content)
		div.roles
			div.grid-6(v-for="(role, index) in ROLES" :key="index")
				div.col-1
					icon(:name="role.icon" size="big")
				div.role-item.col-5
					h3.role-item-name {{ role.name}}
					p.role-item-description {{ role.description }}
</template>


<script>
import { ref } from "vue";
import useModals from "~/store/Modals.js";
import { onClickOutside } from "@vueuse/core";

const ROLES = [
	{
		"icon": "role-admin",
		"name": "Admin",
		"description": "Full visibility and unrestricted access to features, functionalities, settings, and billing details."
	}, {
		"icon": "role-trusted",
		"name": "Trusted",
		"description": "Can view, create, and edit. Administrative access without financial settings."
	}, {
		"icon": "role-basic",
		"name": "Basic",
		"description": "Employee level access with limited settings."
	}
];

export default {
	"props": {
		"modalId": {
			"type": String,
			"required": true
		},
		"title": {
			"type": String,
			"default": "",
			"required": true
		}
	},
	setup ( props ) {
		const modalWindow = ref( null );
		const { deleteModal } = useModals();
		const closeModal = () => deleteModal( props.modalId );

		onClickOutside( modalWindow, () => {
			closeModal();
		});

		return { ROLES, modalWindow, closeModal };
	}
};
</script>


<style lang="stylus" scoped>
.role-item
	margin-top: -0.1em
	margin-left: -2em
	margin-bottom: 1em
	&-name
		font-size: 0.95em
		font-weight: bold
	&-description
		font-size: 0.8em
</style>
