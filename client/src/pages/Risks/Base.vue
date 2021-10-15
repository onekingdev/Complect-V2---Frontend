<template lang="pug">
general-layout(title="Risk Register")
	template(v-slot:controls)
		c-button(label="New Risk" type="primary")
	template(v-slot:content)
		Table(:data="risks")
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	components: {
		GeneralLayout,
		Table
	},
	setup () {
		const { risks } = useData();
		return { risks };
	}
};
</script>
