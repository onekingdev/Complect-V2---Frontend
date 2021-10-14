<template lang="pug">
general-layout(title="Tasks")
	template(v-slot:controls)
		button Download
		button New Task
	template(v-slot:tabs)
</template>

<script>
import GeneralLayout from "~/components/Layouts/General.vue";
export default { components: { GeneralLayout } };
</script>
