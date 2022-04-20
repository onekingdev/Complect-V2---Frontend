<template lang="pug">
card-container.c-chat
	template(#header)
		.tabs
			.tab(v-for="tab in tabs" :key="tab.key" :class="{active: activeTab === tab.key}" @click="switchTab(tab.key)") {{tab.title}}
	template(#content)
		.comments(v-if="activeTab === 'comments'")
			template(v-if="comments && comments.length")
				.comment(v-for="comment in comments" :key="comment.id")
					c-avatar(:firstName="comment.author.firstName" :lastName="comment.author.lastName" :avatar="comment.author.avatar")
					.entry
						.author {{comment.author.firstName}} {{comment.author.lastName}} commented.
						.content
							.text {{comment.text}}
							.files(v-if="comment.files && comment.files.length")
								.file(v-for="file in comment.files") {{file.name}}
					.date {{formatDate(comment.date)}}
			template(v-else)
				.no-comments
					.title No Comments to Display
					.prompt Type in the comment box below to get started
		.comments(v-else)
			c-dropzone
	template(#footer v-if="activeTab === 'comments'")
		.comment-section
			c-textarea(label="Comment" v-model="newComment" fullwidth @keydown.enter.exact.prevent="postComment()")
			c-button(title="Send" type="primary" @click="postComment()" :disabled="!newComment")
</template>


<script>
import { ref, onMounted, nextTick } from "vue";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cDropzone from "~/components/Inputs/cDropzone.vue";
import useProfile from "~/store/Profile.js";
import { formatDate } from "~/core/utils";
export default {
	"components": { cAvatar, cDropzone },
	"props": {
		"comments": {
			"type": Array,
			"default": () => []
		}
	},
	setup ( props ) {
		const { profile } = useProfile();
		const newComment = ref( "" );
		const activeTab = ref( "comments" );
		const tabs = [
			{ "key": "comments", "title": "Comments" }, { "key": "files", "title": "Files" }
		];

		const scrollToBottom = ( behavior = "auto" ) => {
			nextTick( () => {
				const container = document.getElementsByClassName( "card-content" )[0];
				container.scrollTo({ "top": container.scrollHeight, behavior });
			});
		};

		const switchTab = name => activeTab.value = name;

		// will be asynced & connected to api
		// base demonstration only
		const postComment = () => {
			if ( !newComment.value ) return;
			const comment = {
				"date": Date.now(),
				"author": {
					"firstName": profile.value.firstName,
					"lastName": profile.value.lastName,
					"avatar": profile.value.avatar
				},
				"text": newComment.value
			};
			// temp disable for demo
			// eslint-disable-next-line vue/no-mutating-props
			props.comments.push( comment );
			newComment.value = "";
			scrollToBottom( "smooth" );
		};


		onMounted( () => scrollToBottom() );

		return { activeTab, tabs, switchTab, formatDate, newComment, postComment };
	}
};
</script>


<style lang="stylus" scoped>
.c-chat
	min-height: 0
	max-height: 80vh
	height: 100%
	display: flex
	flex-direction: column
	:deep(.card-header)
		padding: 0 1em
	:deep(.card-content)
		flex: 1
		overflow-y: auto
	:deep(.card-footer), :deep(.card-header)
		flex: 0
	.tabs
		width: 100%
		display: flex
		gap: 2em
		align-items: center
		font-size: 0.85em
		.tab
			color: #797B7E
			padding: 0.8em 0
			cursor: pointer
			line-height: 1.2
			&:hover
				color: #000
			&.active
				color: #303132
				box-shadow: inset 0 -4px 0 0 var(--c-gold)
				font-weight: bold

	.comment-section
		width: 100%
		.c-button
			margin-top: 1em
			margin-left: auto
	.comments
		.no-comments
			text-align: center
			display: flex
			flex-direction: column
			justify-content: center
			height: 100%
			line-height: 1.3
			.title
				font-size: 1.4em
				color: #000
			.prompt
				margin-top: 0.5em
				font-size: 0.9em
	.comment
		font-size: 0.9em
		display: flex
		gap: 1em
		padding-bottom: 1em
		border-bottom: 1px solid var(--c-border)
		+ .comment
			margin-top: 1em
		&:last-child
			border: none
		.c-avatar
			flex-shrink: 0
		.author
			color: #000
			font-weight: 600
			margin-bottom: 0.5em
			line-height: 1.2
		.content
			line-height: 1.4
			flex: 1
		.date
			margin-left: auto
			color: #A2A3A9
			font-size: 0.8em
</style>
