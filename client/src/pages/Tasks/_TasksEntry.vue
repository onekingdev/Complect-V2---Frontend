<template lang="pug">
page-container(title="Tasks")
	template(#controls)
		c-button(title="Download")
		c-button(title="New Task" type="primary" @click="openTaskModal()")
	template(#content)
		router-view
</template>


<script>
import { inject } from "vue";
export default {
	setup () {
		const modal = inject( "modal" );
		const openTaskModal = () => modal({ "name": "cModalTask" });

		return { openTaskModal };
	}
};
</script>
