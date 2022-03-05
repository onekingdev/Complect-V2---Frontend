<template lang="pug">
.cell-record
	icon(:name="iconName" size="big")
	.title(@click="openSubFiles()") {{data}}
</template>


<script>
import { computed } from "vue";
import useData from "~/store/Data.js";
export default {
	"props": {
		"id": {
			"type": String,
			"required": true
		},
		"data": {
			"type": String,
			"required": true
		},
		"document": {
			"type": Object,
			"required": true
		}
	},
	"emits": ["cellEvent"],
	setup ( props, { emit }) {
		const { documents } = useData( "records" );

		const iconName = computed( () => props.document.status );

		const openSubFiles = () => {
			const index = documents.value.findIndex( item => item._id === props.id );
			if ( documents.value[index].status === "folder" ) emit( "cellEvent", props.id );
			else window.open( documents.value[index].link, "_blank" );
		};

		return {
			openSubFiles,
			iconName
		};
	}
};
</script>


<style lang="stylus" scoped>
.cell-record
	max-width: 20em
	align-items: flex-end
	gap: 0.3em
	.title
		color: var(--c-link)
		cursor: pointer
		&.completed
			text-decoration: line-through
	a
		overflow: hidden
		text-overflow: ellipsis
		white-space: nowrap
</style>
