<template lang="pug">
document-container(section="Components" title="Additional")
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
				name: "devAdditionalToast",
				title: "Toast"
			}, {
				name: "devAdditionalBanners",
				title: "Banner"
			}, {
				name: "devAdditionalAvatars",
				title: "Avatar"
			}]
		};
	}
};
</script>
