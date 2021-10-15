<template lang="pug">
Table(:data="projects")
	template(v-slot:controls)
		c-button(label="Filter by: All")
</template>

<script>
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	components: { Table },
	setup () {
		const { projects } = useData();
		return { projects };
	}
};
</script>
