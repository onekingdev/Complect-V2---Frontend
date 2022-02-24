<template lang="pug">
page-container(section="Specialist Marketplace" type="document")
	template(#content)
		p.link-content
			span.link-ind(@click="gotoMarket()") Specialist Marketplace
			span.link-ind /
			span.link-ind
				b {{ document.firstName }} {{ document.lastName }}
		card-container(title="Specialist Profile")
			template(#content)
				.user-content.grid-6(v-if="document._id")
					.col-1
						c-avatar(avatar="avatar.jpg" :firstName="document.firstName" :lastName="document.lastName" size="huge")
					.col-5
						.user-detail
							div
								router-link.user-title(:to="{name: 'ExpertDetail', params: {id: document._id}}") {{ document.firstName }} {{ document.lastName }}
								p.user-type
									span.user-indsutry(v-for="(industry, index) in document.industries") {{ industries.find( ind => ind.value == industry )["title"] }}
							c-button-modal.message-button( :modalTitle="`Message with ${document.firstName} ${document.lastName}`" type="primary" title="Message")
								template(#content)
									c-chat(:comments="comments")
						c-rating(readonly v-model="rating")
						div.grid-6.user-info
							div.col-2.user-info-ind
								icon(name="money" size="small")
								.detail
									span Hourly Rate
									p ${{ document.rate }}
							div.col-2.border-left.user-info-ind
								icon(name="money" size="small")
								.detail
									span Experience
									p(v-if="document.experience == 0") Junior
									p(v-if="document.experience == 1") Intermediate
									p(v-if="document.experience == 2") Expert
							div.col-2.border-left.user-info-ind
								icon(name="world" size="small")
								.detail
									span JURISDICTION
									p
										span.user-jurisdiction(v-for="jurisdiction in document.jurisdictions") {{ jurisdictions.find( jur => jur.value == jurisdiction )["title"] }}
				hr
				.skill-content
					p.skill-title Skills
					.skill-ind(v-for="skill in document.skills") {{ skill }}
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import useData from "~/store/Data.js";
import cAvatar from "~/components/Misc/cAvatar.vue";
import cChat from "~/components/Misc/cChat.vue";
import cRating from "~/components/Inputs/cRating.vue";
import { industries, jurisdictions } from "~/data/static.js";
export default {
	"components": { cAvatar, cChat, cRating },
	setup () {
		const { document, readDocuments, clearStore } = useData( "users" );
		const route = useRoute();
		const router = useRouter();

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


		const updateProject = () => {};
		const gotoMarket = () => router.push({ "name": "ExpertList" });

		onMounted( () => readDocuments( route.params.id ) );
		onUnmounted( () => clearStore() );

		return {
			tabs,
			document,
			updateProject,
			industries,
			jurisdictions,
			gotoMarket
		};
	}
};
</script>
<style lang="stylus" scoped>
.link-content
	margin-top: 20px
	margin-bottom: 20px
	cursor: pointer
	.link-ind
		font-size: 16px
		margin-right: 10px
.user-content
	padding: 2em 3em
	margin: 0px -1.5em
	.user-detail
		display: flex
		.user-title
			font-weight: 900
		.user-type
			color: #888
			.user-indsutry
				font-size: 14px
				margin-right: 10px
		.message-button
			margin-left: auto
	.user-description
		margin-top: 20px
		margin-bottom: 30px
	.user-info
		margin-top: 30px
		.border-left
			border-left: 1px solid #ddd
			padding-left: 20px
		.user-info-ind
			display: flex
			flex-direction: row
			gaps: 1em
			font-weight: 700
			svg
				margin-top: 6px
			.detail
				margin-left: 10px
			span
				color: #aaa
				font-weight: 500
			.user-jurisdiction
				margin-right: 10px
				color: #000
.skill-content
	padding: 2em 3em
	border-top: 1px solid #ddd
	.skill-title
		font-size: 20px
		font-weight: 700
		margin-bottom: 20px
	.skill-ind
		border: 1px solid #ddd
		border-radius: 5px
		display: inline-block
		padding: 2px 5px
		margin-right: 10px
		font-size: 14px
</style>
