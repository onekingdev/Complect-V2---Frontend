<template lang="pug">
c-modal(title="Role Types" :modelValue="isModalVisible" @update:modelValue="update")
	template(#content)
		div
			div.items(v-for="(role, index) in roles" :key="index")
				div.icon
					icon(:name="role.icon" size="big")
				div
					div.heading {{ role.title }}
					div.description {{ role.description }}
</template>
<script>
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { cModal },
	"props": {
		"isModalVisible": {
			"type": Boolean,
			"required": true
		}
	},
	"emits": ["updateVisibleModal"],
	setup ( props, context ) {
		const update = ( value ) => {
			context.emit( "updateVisibleModal", value );
		};

		const roles = [
			{
				"title": "Admin",
				"description": "Full visibility and unrestricted access to features, functionalities, settings, and billing details.",
				"icon": "admin"
			}, {
				"title": "Trusted",
				"description": "Can view, create, and edit. Administrative access without financial settings.",
				"icon": "green_checked"
			}, {
				"title": "Basic",
				"description": "Employee level access with limited settings.",
				"icon": "basic"
			}
		];

		return {
			roles,
			update
		};
	}
};
</script>
<style lang="stylus" scoped>
.items
	display: grid
	grid-template-columns: 40px 1fr
	margin-bottom: 1em
	.icon
		position: relative
		top: 2px
	.heading
		font-weight: bold
</style>
