<template lang="pug">
page-container(section="Components" title="Additional")
	template(#tabs)
		router-link(v-for="(tab, index) in tabs" :to="{name: tab.name}" :key="index") {{tab.title}}
	template(#content)
		router-view
</template>


<script>
export default {
	data () {
		return {
			tabs: [{
				name: "devAdditionalIcons",
				title: "Icons"
			}, {
				name: "devAdditionalNotifications",
				title: "Notifications"
			}, {
				name: "devAdditionalBanners",
				title: "Banner"
			}, {
				name: "devAdditionalAvatars",
				title: "Avatar"
			}, {
				name: "devAdditionalTooltip",
				title: "Tooltip"
			}]
		};
	}
};
</script>
