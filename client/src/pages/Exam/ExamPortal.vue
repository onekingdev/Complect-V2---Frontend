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
		card-container.custom(title="Shared with Me")
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

		const sharedReqs = computed( () => requestDocuments.value.filter( req => req.shared ) );

		onMounted( async () => {
			await requests.readDocuments( null, { "examId": id });
			requestDocuments.value = requests.getDocuments().value;
		});

		onUnmounted( () => requests.clearStore() );

		return {
			id,
			sharedReqs
		};
	}
};
</script>

<style lang="stylus" scoped>
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
