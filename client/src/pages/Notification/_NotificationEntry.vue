<template lang="pug">
.container
	page-container(title="Notification Center" class="document")
		template(#tabs)
			router-link.link-item(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{tab.title}}
		template(#content)
			router-view
</template>


<script>
export default {
	setup () {
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
