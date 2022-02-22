<template lang="pug">
market-container
	template(#filter title="Filters")
		card-container
			template(#content)
				h2 Test
	template(#content)
		card-container(title="Browse Jobs")
			template(#content)
				h1 Test
</template>


<script>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import MarketContainer from "~/components/Containers/MarketContainer.vue";
import { calcRiskLevel } from "~/core/utils.js";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
export default {
	"components": { cSelect, cLabel, cBadge, MarketContainer },
	setup () {
		const notification = inject( "notification" );
		const router = useRouter();
		const { createDocuments } = useData( "risks" );

		const options = [
			{ "title": "Low", "value": 0 }, { "title": "Medium", "value": 1 }, { "title": "High", "value": 2 }
		];
		const newRisk = ref({
			"title": "",
			"impact": 0,
			"likelihood": 0,
			"dateCreated": Date.now()
		});

		const newRiskLevel = computed( () => calcRiskLevel( newRisk.value.impact, newRisk.value.likelihood ) );

		const createRisk = async () => {
			newRisk.value.riskLevel = newRiskLevel.value;
			const riskId = await createDocuments([newRisk.value]);
			notification({
				"type": "success",
				"title": "Risk Cteated"
			});
			router.push({
				"name": "RiskDetail",
				"params": { "id": riskId[0] }
			});
		};

		return {
			options,
			newRiskLevel,
			newRisk,
			createRisk
		};
	}
};
</script>

