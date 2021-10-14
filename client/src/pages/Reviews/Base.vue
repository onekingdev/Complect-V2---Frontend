<template lang="pug">
general-layout(title="Internal Reviews")
	template(v-slot:controls)
		c-button(label="New Review" type="primary")
	template(v-slot:content)
		p Reviews
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
export default { components: { GeneralLayout } };
</script>
