<template lang="pug">
Table(:data="policies")
	template(v-slot:controls)
		c-button(label="Filter by: All")
</template>

<script>
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	components: { Table },
	setup () {
		const { policies } = useData();
		return { policies };
	}
};
</script>
