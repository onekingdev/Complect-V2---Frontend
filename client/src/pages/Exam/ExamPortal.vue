<template lang="pug">
header
	| Viewing Auditor's Portal
	router-link.link(:to="{name: 'ExamDetail', params: { id: id }}") Exit
.bg-header
.page
	.container
		.welcome
			.left
				icon(name="search")
			.right
				h3 Welcome
				p Click on a request item below to view its contents and download documents
		.confirm-email(v-if="isConfirmPage")
			h3 Let's get started!
			.form
				c-field(label="Email" required)
				c-button(title="Confirm" type="primary")
		card-container.custom(title="Shared with Me" v-else)
			template(#content)
				.requests(v-if="sharedReqs.length")
					.requests-item(v-for="(request, index) in sharedReqs" :key="index" :class="{'completed': request.completed}")
						.right
							.header
								.name
									| {{ request.name }}
							.details {{ request.details }}
							.counts
								icon(name="chevron-down")
								span {{ request.text_entries ? request.text_entries.length : 0 }} Items
							.text-entries(v-if="request.text_entries")
								.text-entry(v-for="(item, idx) in request.text_entries" :key="idx")
									.textarea {{ item.content }}
</template>


<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import UseData from "~/store/Data.js";
import { useRoute } from "vue-router";

export default {
	setup () {
		const requests = new UseData( "exam_requests" );
		const requestDocuments = ref([]);
		const route = useRoute();
		const id = route.params.id;
		const isConfirmPage = ref( false );

		const sharedReqs = computed( () => requestDocuments.value.filter( req => req.shared ) );

		onMounted( async () => {
			await requests.readDocuments( null, { "examId": id });
			requestDocuments.value = requests.getDocuments().value;
		});

		onUnmounted( () => requests.clearStore() );

		return {
			id,
			sharedReqs,
			isConfirmPage
		};
	}
};
</script>

<style lang="stylus" scoped>
.confirm-email
	border: 1px solid var(--c-border)
	border-radius: 0.3em
	padding: 1em
	background: #fff
	max-width: 40em
	margin: 0 auto
	h3
		font-size: 1.8em
		text-align: center
		font-weight: bold
	button
		margin-top: 1.2em
		width: 100%
header
	background: #ecf4ff
	padding: 1em
	text-align: center
	font-weight: bold
	.link
		margin: 0 1em
		color: #0479FF
		cursor: pointer
.bg-header
	width: 100%
	height: 7em
	background: linear-gradient(155deg, #1b1c29 50%, #1b1c29 55%, #2d304f 60%)
.page
	.container
		max-width: 80em
		margin: 0 auto
		margin-top: -2em
	.welcome
		display: flex
		background: #fff
		border-radius: 0.2em
		padding: 2em
		margin-bottom: 2em
		svg
			width: 4em
			height: 4em
		.right
			margin-left: 1em
			h3
				font-weight: bold
				font-size: 1.7em
.requests-item
	.right
		margin-left: 0
:deep(.card-title)
	margin-left: 0.4em
</style>
