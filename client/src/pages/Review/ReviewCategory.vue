<template lang="pug">
detail-container
	template(#header)
		c-field.category-title(type="text" placeholder="Enter category name" v-model="category.title" fullwidth transparent)
	template(#controls)
		//- c-button(title="Delete")
		c-button-modal(title="Delete" modalTitle="Delete Category" type="primary")
			template(#content)
				icon.col-1(name="success" size="big")
				.text.col-5
					p This will remove the category from this internal review and all of its associated content.
					b Do you want to continue?
			template(#footer)
				c-button(title="Confirm" type="primary" @click="deleteCategory()")
	template(#content)
		.category-container(v-for="(topic, i) in category.content" :key="i")
			.topic-container
				.col-8
					c-textarea(placeholder="Add Topic" v-model="topic.topicContent")
				.col-2
					c-dropdown.right(title="Actions")
						c-button(title="Add Items" type="transparent" @click="addItem(topic)")
						c-button(title="New Task" type="transparent" @click="newTask()")
						c-button(title="Delete" type="transparent" @click="deleteTopic(category.content, i)")
			.item-container(v-for="(item, j) in topic.items" :key="j")
				.item
					.col-1
						.reviews-checkbox
							.checkbox.checkbox-true(:class="{ checked: item.flag }" @click="selectTrueCheck(item)")
								icon.icon-r(name="check" color="white")
							.checkbox.checkbox-false(:class="{ checked: !item.flag }" @click="selectFalseCheck(item)")
								icon.icon-r(name="close")
					.col-7
						c-textarea(placeholder="New Item" v-model="item.itemContent")
					.col-2
						c-dropdown.right(iconR="more" type="transparent")
							c-button(title="Log Finding" type="transparent" @click="addLogFinding(item)")
							c-button(title="Delete" type="transparent" @click="deleteItem(topic.items, j)")
				.finding(v-for="(finding, k) in item.finding" :key="k")
					c-textarea(label="Finding" v-model="finding.findingContent")
					icon.icon-r(name="close" @click="deleteFinding(item.finding, k)")
	template(#footer)
		c-button(title="Add Topic" iconL="circle_plus" @click="addTopic()")
		.end-buttons
			c-button(title="Save" @click="updateCategory()")
			//- c-button-modal(:title="btnTitle" modalTitle="Complete Category" type="primary")
			//- 	template(#content)
			//- 		icon.col-1(name="success" size="big")
			//- 		.text.col-5
			//- 			p This will mark the category as complete and your progress will be updated.
			//- 			b Do you want to continue?
			//- 	template(#footer)
			//- 		c-button(title="Confirm" type="primary" @click="completeCategory()")
			c-button(:title="btnTitle" type="primary" @click="completeCategory()")
</template>

<script>
import { ref, computed, onMounted, onUnmounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import useData from "~/store/Data.js";
import cDropdown from "~/components/Inputs/cDropdown.vue";
export default {

	"components": { cDropdown	},
	setup () {
		const { document, clearStore, readDocuments, updateDocument } = useData( "reviews" );
		const modal = inject( "modal" );
		const notification = inject( "notification" );
		const router = useRouter();
		const route = useRoute();
		let catId = route.params.catId;

		const btnTitle = computed( () => category.value.completedAt ? "Mark as Incomplete" : "Mark as Complete" );

		const category = ref( {
			"title": "",
			"content": []
		} );

		const addTopic = () => {
			category.value.content.push({"topicContent": "", "items": []});
		}

		const addItem = topic => {
			topic.items.push({"itemContent": "", "flag": false, "finding": []});
		}

		const newTask = () => modal({ "name": "cModalTask" });

		const deleteTopic = ( topicArr, index ) => topicArr.splice(index, 1);

		const selectTrueCheck = item => item.flag = true;

		const selectFalseCheck = item => item.flag = false;

		const addLogFinding = item => item.finding.push({"findingContent": ""});

		const deleteItem = ( itemArr, index ) => itemArr.splice(index, 1);

		const deleteFinding = ( findingArr, index ) => findingArr.splice(index, 1);

		const deleteCategory = async () => {
			try {
				document.value.categories.splice(catId, 1);
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
				getData();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Category has not been deleted. Please try again."
				});
			}
		}

		const updateCategory = async () => {
			try {
				document.value.categories[catId] = category.value;
				await updateDocument( document.value._id, document.value );
				notification({
					"type": "success",
					"title": "Success",
					"message": "Category has been updated."
				});
				getData();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": "Category has not been updated.. Please try again."
				});
			}
		};

		const completeCategory = async () => {
			let timestamp = category.value.completedAt ? null : Date.now();
			document.value.categories[catId].completedAt = timestamp;
			try {
				await updateDocument( document.value._id, document.value);
				notification({
					"type": "success",
					"title": "Success",
					"message": `Review has been marked as ${timestamp ? "complete" : "incomplete"}.`
				});
				getData();
			} catch ( error ) {
				console.error( error );
				notification({
					"type": "error",
					"title": "Error",
					"message": `Review has not been marked as ${timestamp ? "complete" : "incomplete"}. Please try again.`
				});
			}
		};

		const getData = async () => {
			catId = route.params.catId;
			console.log("catId", catId);
			readDocuments( route.params.id );
			category.value = document.value.categories[catId];
		};

		onMounted( () => getData() );
		onUnmounted( () => clearStore() );

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
		font-size: 1.25em
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
					cursor: pointer
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
				top: 0.3em
				font-size: 20px
				padding: 0.2em
	.end-buttons
		display: flex
		gap: 0.75em
</style>
