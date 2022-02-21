<template lang="pug">
page-container(title="Risk Register")
	template(#controls)
		c-button-modal(title="New Risk" modalTitle="New Risk" type="primary")
			template(#content)
				c-field(label="Risk Name" v-model="newRisk.title" required)
				c-select.col-3(label="Impact" :data="options" v-model="newRisk.impact")
				c-select.col-3(label="Likelihood" :data="options" v-model="newRisk.likelihood")
				c-label.col-2(label="Risk Level")
					c-badge(icon="warning-light" :title="`risk${newRiskLevel}`")
			template(#footer)
				c-button(title="Create" type="primary" @click="createRisk()")
	template(#content)
		router-view
</template>


<script>
import { ref, computed, inject } from "vue";
import { useRouter } from "vue-router";
import { calcRiskLevel } from "~/core/utils.js";
import useData from "~/store/Data.js";
import cSelect from "~/components/Inputs/cSelect.vue";
import cLabel from "~/components/Misc/cLabel.vue";
import cBadge from "~/components/Misc/cBadge.vue";
export default {
	"components": { cSelect, cLabel, cBadge },
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

