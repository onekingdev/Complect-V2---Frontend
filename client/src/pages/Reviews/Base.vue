<template lang="pug">
general-layout(title="Internal Reviews")
	template(v-slot:controls)
		c-button(label="New Review" type="primary")
	template(v-slot:content)
		Table(:data="reviews")
			template(v-slot:controls)
				c-button(label="Filter by: All")
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
		const { reviews } = useData();
		return { reviews };
	}
};
</script>
