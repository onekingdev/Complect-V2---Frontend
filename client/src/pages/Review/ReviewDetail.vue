<template lang="pug">
vertical-tabs
	template(#tabs)
		.category
			.title General
			c-button(type="icon" iconL="check" size="big")
		//- .category(v-for="(category, index) in categories" :key="index")
			router-link(:to="{name: 'ReviewCategory', params: {catId: category.id}}") {{ category.title }}
			c-button(type="icon" iconL="check")
		c-button(title="New Category" iconL="circle_plus" @click="addCategory()" disabled)
	template(#content)
		card-container(title="General")
			template(#footer)
				c-button(title="Save" disabled)
				c-button(title="Mark as Complete" type="primary" disabled)
		//- router-view
</template>


<script>
import useData from "~/store/Data.js";
import VerticalTabs from "~/components/Containers/VerticalTabs.vue";
export default {
	"components": { VerticalTabs },
	setup () {
		const { document } = useData( "reviews" );
		const categories = [{
			"id": 1,
			"title": "General",
			"sections": []
		}];

		const addCategory = () => console.debug( "Add new Category" );
		return {
			document,
			categories,
			addCategory
		};
	}
};
</script>


<style lang="stylus" scoped>
.category
	display: flex
	align-items: center
	margin-bottom: 1em
	.c-button
		margin-left: auto
		:deep(svg.icon-check)
			fill: #cecfd2
</style>

