<template lang="pug">
c-card(title="Banner" type="flex-column" devmode)
	template(#header-controls)
		c-button(iconL="refresh" type="transparent" @click="refreshBanners()" devmode)
	template(#content)
		c-banner(v-for="banner in banners" v-bind="banner.content")
			template(#controls)
				c-button(v-for="button in banner.buttons" :title="button" devmode)
				c-button(type="icon" icon="close" size="small")
</template>


<script>
import { ref, onMounted } from "vue"
import cBanner from "~/components/Misc/cBanner.vue";
import { randomTitles } from "~/_devmode/generator/components/molecules/randomTexts.js";
export default {
	components: { cBanner },
	setup() {
		const banners = ref([])
		const bannerTypes = ['info', 'success', 'warning', 'error']
		
		const refreshBanners = () => {
			banners.value = []
			bannerTypes.forEach(type => {
				banners.value.push({
					content: {
						type: type,
						title: randomTitles({w: [2, 5]})[0],
						message: randomTitles({w: [5, 20]})[0]
					},
					buttons: randomTitles({q:[0,1],w:1})
				})
			});
		}

		onMounted(() => refreshBanners())
		return { banners, refreshBanners }
	}
};
</script>
