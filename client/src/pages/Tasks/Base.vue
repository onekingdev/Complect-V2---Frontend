<template lang="pug">
general-layout(title="Tasks")
	template(v-slot:controls)
		c-button(label="Download")
		c-button(label="New Task" type="primary")
	template(v-slot:content)
		p Tasks
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
export default { components: { GeneralLayout } };
</script>
