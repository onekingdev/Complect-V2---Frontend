<template lang="pug">
page-container(section="Risk Register" :title="document.title" :badge="{icon:'warning-light', title: `risk${riskLevel}`}" type="document")
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
		const risks = new useData( "risks" );
		const route = useRoute();
		const router = useRouter();

		const riskLevel = computed( () => calcRiskLevel( risks.getDocument().value.impact, risks.getDocument().value.likelihood ) );

		const closeRisk = () => router.push({ "name": "RisksOverview" });

		const deleteRisk = () => {
			risks.deleteDocuments( risks.getDocument().value._id );
			closeRisk();
		};

		onMounted( () => risks.readDocuments( route.params.id ) );
		onUnmounted( () => risks.clearStore() );

		return {
			document: risks.getDocument(),
			riskLevel,
			closeRisk,
			deleteRisk
		};
	}
};
</script>
