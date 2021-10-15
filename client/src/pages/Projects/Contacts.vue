<template lang="pug">
Table(:data="contacts")
</template>

<script>
import useData from "~/store/Data.js";
import Table from "~/components/Table/Table.vue";
export default {
	components: { Table },
	setup () {
		const { contacts } = useData();
		return { contacts };
	}
};
</script>
