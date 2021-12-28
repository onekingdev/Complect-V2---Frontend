<template lang="pug">
document-container(section="Projects" :title="review.title")
	template(#controls)
		c-button(title="Dowload")
		c-button(title="Save and Exit" type="primary")
		c-button(type="icon" iconL="close" size="small" @click="closeReview()")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
	template(#navigation-controls)
		c-dropdown(title="Actions")
			c-button-modal(title="Edit" modalTitle="Edit Review" type="transparent")
				template(#content)
					c-field(label="New Name" v-model="review.title" required)
					c-field.col-3(label="Start Date" type="date" v-model="review.startsAt" required)
					c-field.col-3(label="End Date" type="date" v-model="review.endsAt" required)
				template(#footer)
					c-button(title="Save" type="primary")
			c-button-modal(title="Delete" modalTitle="Delete Review" type="transparent")
				template(#content)
	template(#content)
		router-view
</template>
<script>
import { reactive } from "@vue/reactivity";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown },
	setup () {
		const review = reactive({
			"title": "Review One",
			"startsAt": Date.now(),
			"endsAt": Date.now()
		});

		const tabs = [
			{
				"title": "Detail",
				"routeName": "ReviewDetail"
			}, {
				"title": "Tasks",
				"routeName": "ReviewTasks"
			}, {
				"title": "Documents",
				"routeName": "ReviewDocuments"
			}
		];

		const closeReview = () => {
			window.location = "/reviews";
		};

		return {
			review,
			tabs,
			closeReview
		};
	}
};
</script>
