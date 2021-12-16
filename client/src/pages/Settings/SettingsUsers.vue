<template lang="pug">
c-card(title="Users")
  template(#content)
    documents-container(:showHeader="false" :tabBorder="true")
      template(#tabs)
        router-link(v-for="(tab, index) in tabs" :key="index" :to="{name: tab.routeName}") {{ $locale(tab.title)}}
      template(#content)
        router-view
</template>
<script>

export default {
	setup () {
		const tabs = [
			{
				"title": "Directory(1)",
				"routeName": "Directory"
			}, {
				"title": "Disabled(0)",
				"routeName": "Disabled"
			}
		];

		return { tabs };
	}
};
</script>
