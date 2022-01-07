<template lang="pug">
document-container(section="Risk Register" :title="document.title" :badge="{icon:'warning-light', title: `risk${riskLevel}`}")
	template(#controls)
		c-button(title="Delete" type="destructive" @click="deleteRisk()")
		c-button(type="icon" iconL="close" size="small" @click="closeRisk()")
	template(#content)
		router-view
</template>


<script>
import { computed, onMounted, onUnmounted } from "vue";
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

		const riskLevel = computed( () => calcRiskLevel( document.value.impact, document.value.likelihood ) );

		const closeRisk = () => router.push({ "name": "RisksOverview" });

		const deleteRisk = () => {
			deleteDocuments( document.value._id );
			closeRisk();
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
