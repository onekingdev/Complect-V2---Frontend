<template lang="pug">
c-card(title="Collaborators")
	template(v-slot:controls)
		c-button(title="New Collaborator" type="primary")
</template>


<script>
import cCard from "~/components/Misc/Card.vue";
export default { "components": { cCard } };
</script>
