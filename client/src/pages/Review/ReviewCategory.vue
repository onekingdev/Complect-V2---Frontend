<template lang="pug">
detail-container
	template(#header)
		c-field.category-title(type="text" placeholder="Enter category name" v-model="category.title" fullwidth transparent)
	template(#controls)
		c-button-modal(title="Delete" modalTitle="Delete Category")
			template(#content)
				.col-1
					icon(name="error" size="huge")
				.col-5
					p This will remove the category from this internal review and all of its associated content.
					p
						b Do you want to continue?
			template(#footer)
				c-button(title="Confirm" type="primary" @click="deleteCategory()")
	template(#content)
		.category-container(v-for="(topic, i) in category.content" :key="i")
			.topic-container.grid-12
				.topic-text.col-9
					c-textarea(placeholder="Add Topic" v-model="topic.topicContent")
				.topic-action.col-3
					c-dropdown.right(title="Actions")
						c-button(title="Add Items" type="transparent" @click="addItem(topic)")
						c-button(title="New Task" type="transparent" @click="newTask()")
						c-button-modal(title="Delete" type="transparent" modalTitle="Delete Topic")
							template(#content)
								.col-1
									icon(name="error" size="huge")
								.col-5
									p This will remove the topic from this internal review and all of its associated content.
									p
										b Do you want to continue?
							template(#footer)
								c-button(title="Confirm" type="primary" @click="deleteTopic(category.content, i)")
			.item-container(v-for="(item, j) in topic.items" :key="j")
				.item.grid-12
					.item-checkboxes
						.reviews-checkbox
							.checkbox.checkbox-true(:class="{ checked: item.flag }" @click="selectTrueCheck(item)")
								icon.icon-r(name="check" size="tiny" color="white")
							.checkbox.checkbox-false(:class="{ checked: !item.flag }" @click="selectFalseCheck(item)")
								icon.icon-r(name="close" size="tiny")
					.item-text
						c-textarea(placeholder="New Item" v-model="item.itemContent")
					.item-action
						c-dropdown.right(iconR="more" type="transparent")
							c-button(title="Log Finding" type="transparent" @click="addLogFinding(item)")
							c-button-modal(title="Delete" type="transparent" modalTitle="Delete Item")
								template(#content)
									.col-1
										icon(name="error" size="huge")
									.col-5
										p This will remove the topic from this internal review and all of its associated content.
										p
											b Do you want to continue?
								template(#footer)
									c-button(title="Confirm" type="primary" @click="deleteItem(topic.items, j)")
				.finding(v-for="(finding, k) in item.finding" :key="k")
					c-textarea(label="Finding" v-model="finding.findingContent")
					c-button-modal(type="transparent" icon="close" modalTitle="Delete Item")
						template(#content)
							.col-1
								icon(name="error" size="huge")
							.col-5
								p This will remove the topic from this internal review and all of its associated content.
								p
									b Do you want to continue?
						template(#footer)
							c-button(title="Confirm" type="primary" @click="deleteFinding(item.finding, k)")
	template(#footer)
		c-button(title="Add Topic" iconL="circle_plus" @click="addTopic()")
		.end-buttons
			c-button(title="Save" @click="updateCategory()")
			c-button(:title="btnTitle" type="primary" @click="completeCategory()")
</template>

<script>
import { computed, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import useData from "~/store/Data.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {
	"components": { cDropdown	},
	"props": {
		"reviewCategory": {
			"type": Object,
			"required": true,
			"default": {}
		}
	},
	"emits": ["update:reviewCategory"],
	setup ( props ) {
		const { document, updateDocument } = useData( "reviews" );
		const modal = inject( "modal" );
		const notification = inject( "notification" );
		const router = useRouter();
		const route = useRoute();

		const category = computed( () => props.reviewCategory );
		const btnTitle = computed( () => category.value.completedAt ? "Mark as Incomplete" : "Mark as Complete" );

		const addTopic = () => category.value.content.push({ "topicContent": "", "items": [] });

		const addItem = topic => topic.items.push({ "itemContent": "", "flag": false, "finding": [] });

		const addLogFinding = item => item.finding.push({ "findingContent": "" });

		const newTask = () => modal({ "name": "cModalTask" });

		const selectTrueCheck = item => item.flag = true;

		const selectFalseCheck = item => item.flag = false;

		const deleteTopic = ( topicArr, index ) => {
			topicArr.splice( index, 1 );
			notification({
				"type": "success",
				"title": "Success",
				"message": "Topic has been deleted."
			});
		};

		const deleteItem = ( itemArr, index ) => {
			itemArr.splice( index, 1 );
			notification({
				"type": "success",
				"title": "Success",
				"message": "Item has been deleted."
			});
		};

		const deleteFinding = ( findingArr, index ) => {
			findingArr.splice( index, 1 );
			notification({
				"type": "success",
				"title": "Success",
				"message": "Finding has been deleted."
			});
		};

		const deleteCategory = async () => {
			try {
				const catId = route.params.catId;
				document.value.categories.splice( catId, 1 );
				await updateDocument( document.value._id, document.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Category has been deleted."
				});
				router.push({
					"name": "ReviewDetail",
					"params": { "id": document.value._id }
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Category has not been deleted. Please try again."
				});
			}
		};

		const updateCategory = async () => {
			try {
				const catId = route.params.catId;
				document.value.categories[catId] = category.value;
				await updateDocument( document.value._id, document.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Category has been updated."
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Category has not been updated. Please try again."
				});
			}
		};

		const completeCategory = async () => {
			const timestamp = category.value.completedAt ? null : Date.now();
			const catId = route.params.catId;
			document.value.categories[catId].completedAt = timestamp;
			try {
				await updateDocument( document.value._id, document.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": `Review has been marked as ${timestamp ? "complete" : "incomplete"}.`
				});
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `Review has not been marked as ${timestamp ? "complete" : "incomplete"}. Please try again.`
				});
			}
		};

		return {
			btnTitle,
			category,
			deleteCategory,
			addTopic,
			addItem,
			newTask,
			deleteTopic,
			addLogFinding,
			deleteItem,
			updateCategory,
			selectTrueCheck,
			selectFalseCheck,
			deleteFinding,
			completeCategory
		};
	}
};
</script>

<style lang="stylus" scoped>
	.category-title
		font-size: 1em
	.category-container
		padding: 1.25em 0
		border-bottom: 1px solid #dcdee4
		.right
			float: right
		.topic-container
			margin-bottom: 2em
		.item-container
			margin-bottom: 1em
			.item
				.item-checkboxes
					@media (min-width: 992px)
						grid-column: span 2
					@media (min-width: 1200px)
						grid-column: span 1
				.item-text
					@media (min-width: 992px)
						grid-column: span 7
					@media (min-width: 1200px)
						grid-column: span 9
				.item-action
					@media (min-width: 992px)
						grid-column: span 3
					@media (min-width: 1200px)
						grid-column: span 2
					.c-dropdown
						:deep(.dropdown)
							border-radius: 5px
							right: 0
							min-width: 8em
			.reviews-checkbox
				display: flex
				justify-content: space-between
				font-size: 0.8em
				.checkbox
					cursor: pointer
					background-color: white
					color: black !important
					padding: 0.1em 1em
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
			.c-button-modal
				top: 7px;
				position: relative;
	.end-buttons
		display: flex
		gap: 0.75em
	.topic-text, .item-text
		:deep(.field-body)
			resize: none
			overflow: hidden
			font-weight: 500
			border: 1px solid transparent
			box-shadow: 0 0 0
			min-height: 60px
			transition: all .2s ease-in
			&:hover
				border: 1px solid #dee2e6
	.topic-text
		:deep(.field-body)
			font-size: 18px
	.item-text
		:deep(.field-body)
			font-size: 16px
	.finding
		:deep(.field-body)
			resize: none
			height: 60px
			overflow: hidden
			color: #303132
			font-weight: 400
			box-shadow: 0 0 0
			border: 1px solid #ced4da
			&:focus
				color: #495057
				border-color: #80dbff

</style>
