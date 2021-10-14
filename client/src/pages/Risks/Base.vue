<template lang="pug">
general-layout(title="Risk Register")
	template(v-slot:controls)
		c-button(label="New Risk" type="primary")
	template(v-slot:content)
		p Risk
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
export default { components: { GeneralLayout } };
</script>
