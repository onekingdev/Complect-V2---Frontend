<template lang="pug">
card-container(title="Users")
	template(#content)
		horizontal-tabs
			template(#tabs)
				router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}} ({{ usersCount[tab.title] }})
			template(#content)
				router-view
</template>


<script>
import HorizontalTabs from "~/components/Containers/HorizontalTabs.vue";
import { computed } from "vue";
export default {
	"components": { HorizontalTabs },
	setup () {
		const tabs = [
			{
				"title": "Directory",
				"routeName": "SettingsUsersDirectory"
			}, {
				"title": "Disabled",
				"routeName": "SettingsUsersDisabled"
			}
		];

		const usersCount = computed( () => ({
			"Total": 2,
			"Directory": 0,
			"Disabled": 0
		}) );

		return {
			tabs,
			usersCount
		};
	}
};
</script>
