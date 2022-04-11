<template lang="pug">
.container
	page-container(title="Notification Center" class="document")
		template(#tabs)
			router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
		template(#content)
			router-view
</template>


<script>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import useProfile from "~/store/Profile.js";
import UseData from "~/store/Data.js";
import { manualApi } from "~/core/api.js";

export default {
	setup () {
		const policies = new UseData( "policies" );
		const { profile } = useProfile();
		const tabs = [
			{
				"title": "Notification",
				"routeName": "NotificationCenter"
			}, {
				"title": "Message",
				"routeName": "NotificationMessage"
			}
		];

		return { tabs };
	}
};
</script>
<style lang="stylus" scoped>
.container
	background: var(--c-bg-z1)
	min-height: 100%
	padding: 2em
</style>
