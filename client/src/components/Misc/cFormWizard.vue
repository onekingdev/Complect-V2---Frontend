<template lang="pug">
.c-form-wizard
	slot
</template>


<script>
import { reactive } from "vue"
export default {
	setup() {
		const data = reactive({
			email: "",
			password: ""
		})
		return { data }
	}
};
</script>

<style lang="stylus" scoped>
// .c-form-wizard
</style>
