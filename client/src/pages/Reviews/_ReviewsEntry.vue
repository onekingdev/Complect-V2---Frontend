<template lang="pug">
page-container(title="Internal Reviews")
	template(#controls)
		c-button(title="New Review" type="primary" @click="createReview()")
	template(#content)
		router-view
</template>

<script>
import { inject } from "vue";

export default {
	setup () {
		const modal = inject( "modal" );

		const createReview = () => modal({ "name": "cModalReview" });

		return { createReview };
	}
};
</script>

