<template lang="pug">
page-container(section="Risk Register" :title="document.title" :badge="{icon:'warning-light', title: `risk${riskLevel}`}" type="document")
	template(#controls)
		c-button-modal(title="Delete" modalTitle="Delete Risk" type="primary")
			template(#content)
				.col-1
					icon(name="error" size="huge")
				.col-5
					p This risk will be deleted from the Risk Register and all policy controls will be unlinked.
					p
						b Do you want to continue?
			template(#footer)
				c-button(title="Delete" type="primary" @click="deleteRisk()")
		c-button(type="icon" iconL="close" size="small" @click="closeRisk()")
	template(#content)
		router-view
</template>


<script>
import { computed, onMounted, onUnmounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import useData from "~/store/Data.js";
import { calcRiskLevel } from "~/core/utils.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown },
	setup () {
		const { document, readDocuments, clearStore, deleteDocuments } = useData( "risks" );
		const route = useRoute();
		const router = useRouter();
		const notification = inject( "notification" );

		const riskLevel = computed( () => calcRiskLevel( document.value.impact, document.value.likelihood ) );

		const closeRisk = () => router.push({ "name": "RisksOverview" });

		const deleteRisk = async () => {
			try {
				await deleteDocuments( document.value._id );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Risk has been deleted."
				});
				closeRisk();
			} catch ( error ) {
				notification({
					"type": "error",
					"title": "Error",
					"message": "Risk has not been deleted. Please try again."
				});
			}
		};

		onMounted( () => readDocuments( route.params.id ) );
		onUnmounted( () => clearStore() );

		return {
			document,
			riskLevel,
			closeRisk,
			deleteRisk
		};
	}
};
</script>
