<template lang="pug">
documents-container(title="Risk Register")
	template(#controls)
		c-button(title="New Risk" type="primary" @click="toggleShowCreateRiskModal")
		risk-modal(title="New Risk" :isModalVisible="isShowCreateRiskModal" @updateVisibleModal="updateVisibleModal")
	template(#content)
		c-field.search-input(type="text" placeholder="Search" iconL="search")
		div
			c-table(v-bind="{columns, documents}")
</template>
<script>
import { ref } from "vue";
import RiskModal from "~/pages/Risks/components/RiskModal.vue";
import cLabel from "~/components/Misc/cLabel.vue";

export default {
	"components": {
		RiskModal,
		cLabel
	},
	setup () {
		const isShowCreateRiskModal = ref( false );
		const columns = [
			{
				"title": "Name",
				"key": "name",
				"type": "title",
				"meta": { "link": "Risk" }
			},
			{
				"title": "Impact",
				"key": "impact",
				"type": "title"
			},
			{
				"title": "Likelihood",
				"key": "likelihood",
				"type": "title"
			},
			{
				"title": "Risk Level",
				"key": "risk_level",
				"type": "label"
			},
			{
				"title": "Date Created",
				"key": "created_at",
				"type": "date"
			}
		];

		const documents = [
			{
				"_id": "1",
				"name": "Risk",
				"impact": "Low",
				"likelihood": "Medium",
				"risk_level": {
					"title": "Low",
					"iconName": "triangle",
					"type": "low"
				},
				"created_at": new Date().toString()
			}, {
				"_id": "2",
				"name": "Risk",
				"impact": "Low",
				"likelihood": "Medium",
				"risk_level": {
					"title": "Medium",
					"iconName": "triangle",
					"type": "medium"
				},
				"created_at": new Date().toString()
			}, {
				"_id": "3",
				"name": "Risk",
				"impact": "Low",
				"likelihood": "Medium",
				"risk_level": {
					"title": "High",
					"iconName": "triangle",
					"type": "high"
				},
				"created_at": new Date().toString()
			}
		];

		const toggleShowCreateRiskModal = () => {
			isShowCreateRiskModal.value = !isShowCreateRiskModal.value;
		};

		const updateVisibleModal = ( value ) => {
			isShowCreateRiskModal.value = value;
		};

		return {
			columns,
			documents,
			isShowCreateRiskModal,
			updateVisibleModal,
			toggleShowCreateRiskModal
		};
	}
};
</script>
<style lang="stylus" scoped>
.search-input
	display: block
	max-width: 20em
</style>
