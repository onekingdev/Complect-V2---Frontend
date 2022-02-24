<template lang="pug">
.cell-reason(@click="editReason()") {{ reason }}
</template>


<script>
import { ref, inject, onMounted } from "vue";

export default {
	"props": {
		"data": {
			"type": Object,
			"required": true
		}
	},
	setup ( props ) {
		const modal = inject( "modal" );
		const reason = ref( "" );


		const handleUpdateReason = newData => {
			reason.value = newData.disabledReason;
		};

		const callBack = { "handleSuccess": handleUpdateReason };

		const editReason = () => {
			modal({ "name": "cModalTeamMember", "id": props.data.id, "modalType": "disabled", callBack });
		};

		onMounted( () => reason.value = props.data.disabledReason );

		return { reason, editReason };
	}
};
</script>


<style lang="stylus" scoped>
.cell-reason
	text-transform: capitalize
	color: var(--c-info)
	cursor: pointer
</style>
