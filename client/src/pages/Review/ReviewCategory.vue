<template lang="pug">
detail-container
	template(#header)
		c-field(type="text" placeholder="Enter category name" fullwidth transparent)
	template(#controls)
		c-button(title="Delete")
	template(#content)
		.category-container
			.topic-container
				.col-8
					c-textarea(placeholder="Add Topic")
				.col-2
					c-dropdown.right(title="Actions" wide)
						c-button(title="Add Items" type="transparent" @click="editReview()")
						c-button(title="New Task" type="transparent" @click="editReview()")
						c-button(title="Delete" type="transparent" @click="deleteReiew()")
			.item-container
				.item
					.col-1
						.reviews-checkbox
							.checkbox.checkbox-true
								icon.icon-r(name="check" color="white")
							.checkbox.checkbox-false.checked
								icon.icon-r(name="close")
					.col-7
						c-textarea(placeholder="New Item")
					.col-2
						c-dropdown.right(iconR="more" type="transparent")
							c-button(title="Log Finding" type="transparent" @click="deleteReiew()")
							c-button(title="Delete" type="transparent" @click="deleteReiew()")
				.finding
					c-textarea(label="Finding")
					icon.icon-r(name="close")
	template(#footer)
		c-button(title="Add Topic" iconL="circle_plus")
		.end-buttons
			c-button(title="Save")
			c-button(title="Mark as Complete" type="primary")
</template>

<script>
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {

	"components": { cDropdown	},
	setup () {
		return {

		};
	}
};
</script>

<style lang="stylus" scoped>
	.category-container
		padding: 1.25em 0
		border-bottom: 1px solid #dcdee4
		.right
			max-width: 100%
			display: flex
			justify-content: flex-end
		.topic-container
			margin-bottom: 1em
			display: flex
			.col-8
				width: 80%
			.col-2
				width: 20%
		.item-container
			margin-bottom: 1em
			.item
				display: flex
				gap: 0.5em
				.col-1
					width: 10%
				.col-7
					flex: 70%
				.col-2
					width: 20%
			.reviews-checkbox
				display: flex
				justify-content: space-between
				font-size: 0.8em
				.checkbox
					background-color: white
					color: black !important
					padding: 0.1em 0.75em
					border: 1px solid #dee2e6
					border-radius: 3px
					svg
						fill: black
					&.checked
						svg
							fill: white
				.checkbox-true
					&.checked
						background-color: #1ab27f
						border-color: #1ab27f
						color: white !important
				.checkbox-false
					&.checked
						background-color: #ce1938
						border-color:	#ce1938
						color: white !important
						svg
							fill: white
		.finding
			display: flex
			justify-content: center
			align-items: center
			gap: 0.75em
			width: 75%
			margin: auto
			svg
				position: relative
				top: 0.5em
				font-size: 20px
				padding: 0.2em
	.end-buttons
		display: flex
		gap: 0.75em
</style>
