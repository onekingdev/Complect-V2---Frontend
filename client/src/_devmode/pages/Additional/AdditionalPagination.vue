<template lang="pug">
card-container(title="Pagination")
	template(#content)
		p Current Page: {{currentPage}}
		c-pagination(:length="180" v-model:currentPage="currentPage")
</template>


<script>
import { ref } from "vue"
import cPagination from "~/components/Misc/cPagination.vue";
export default {
	components: { cPagination },
	setup() {
		const currentPage = ref(1)
		return { currentPage }
	}
};
</script>