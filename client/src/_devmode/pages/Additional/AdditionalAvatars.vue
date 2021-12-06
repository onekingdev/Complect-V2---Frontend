<template lang="pug">
c-card(title="Constructor")
	template(v-if="userProfile" #content)
		component-constructor
			template(#controls)
				c-switcher.col-full(id="avatar-sizes" label="Size" :options="options.sizes" v-model="selectedOptions.size" fullwidth)
				c-switcher.col-full(id="avatar-shapes" label="Shape" :options="options.shapes" v-model="selectedOptions.shape" fullwidth)
			template(#code)
				code c-avatar(avatar="url" firstName="{{userProfile.first_name}}" lastName="{{userProfile.last_name}}" size="{{selectedOptions.size}}" shape="{{selectedOptions.shape}}")
			template(#preview)
				c-avatar(:size="selectedOptions.size" :shape="selectedOptions.shape" :avatar="userProfile.avatar" :firstName="userProfile.first_name" :lastName="userProfile.last_name")
				c-avatar(:size="selectedOptions.size" :shape="selectedOptions.shape" :firstName="userProfile.first_name" :lastName="userProfile.last_name")
			
c-card(title="Collection" type="grid-6")
	template(#header-controls)
		c-button(iconL="refresh" type="transparent" @click="refreshUser()" devmode)
	template(v-if="userProfile" #content)
		.preview-column.col-2(v-for="shape in options.shapes")
			c-avatar(v-for="size in options.sizes" :avatar="userProfile.avatar" :firstName="userProfile.first_name" :lastName="userProfile.last_name" :size="size.value" :shape="shape.value")
		.preview-column.col-2(v-for="shape in options.shapes")
			c-avatar(v-for="size in options.sizes" :firstName="userProfile.first_name" :lastName="userProfile.last_name" :size="size.value" :shape="shape.value")
</template>


<script>
import { ref, reactive, onMounted } from "vue"
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue"
import cSwitcher from "~/components/Inputs/cSwitcher.vue"
import cAvatar from "~/components/Misc/cAvatar.vue";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers.js";

export default {
	components: { ComponentConstructor, cSwitcher, cAvatar },
	setup() {
		const userProfile = ref(null)
		const refreshUser = () => userProfile.value = randomUsers({q:1})[0]

		const options = {
			sizes: [
				{title: "Tiny", value: "tiny"},
				{title: "Small", value: "small"},
				{title: "Regular", value: "regular"},
				{title: "Big", value: "big"},
				{title: "Huge", value: "huge"}
			],
			shapes: [
				{title: "Circle", value: "circle"},
				{title: "Rounded", value: "rounded"},
				{title: "Square", value: "square"}
			]
		}

		const selectedOptions = reactive({
			size: "regular",
			shape: "circle",
		})

		onMounted(() => refreshUser())
		

		return { options, selectedOptions, userProfile, refreshUser }
	}
};
</script>


<style lang="stylus" scoped>
.c-card
	margin-bottom: 2em
	.preview-column
		display: flex
		flex-direction: column
		gap: 1em
		align-items: center
</style>
