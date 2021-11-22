<template lang="pug">
c-card(title="Constructor")
	template(v-if="userProfile" #content)
		components-constructor
			template(#preview)
				.preview-column
					c-avatar(:size="selectedOptions.size" :shape="selectedOptions.shape" :avatar="userProfile.avatar" :firstName="userProfile.first_name" :lastName="userProfile.last_name")
					c-avatar(:size="selectedOptions.size" :shape="selectedOptions.shape" :firstName="userProfile.first_name" :lastName="userProfile.last_name")
			template(#controls)
				c-switcher.col-full(id="avatar-sizes" label="Size:" :options="options.sizes" v-model="selectedOptions.size")
				c-switcher.col-full(id="avatar-shapes" label="Shape:" :options="options.shapes" v-model="selectedOptions.shape")
			template(#code)
				code c-avatar(avatar="url" firstName="{{userProfile.first_name}}" lastName="{{userProfile.last_name}}" size="{{selectedOptions.size}}" shape="{{selectedOptions.shape}}")

c-card(title="Collection" type="grid-6")
	template(#header-controls)
		c-button(icon="refresh" type="transparent" @click="refreshUser()" devmode)
	template(v-if="userProfile" #content)
		.preview-column.col-2(v-for="shape in options.shapes")
			c-avatar(v-for="size in options.sizes" :avatar="userProfile.avatar" :firstName="userProfile.first_name" :lastName="userProfile.last_name" :size="size.key" :shape="shape.key")
		.preview-column.col-2(v-for="shape in options.shapes")
			c-avatar(v-for="size in options.sizes" :firstName="userProfile.first_name" :lastName="userProfile.last_name" :size="size.key" :shape="shape.key")
</template>


<script>
import { ref, reactive, onMounted } from "vue"
import ComponentsConstructor from "~/_devmode/misc/ComponentsConstructor.vue"
import cSwitcher from "~/components/Inputs/cSwitcher.vue"
import cAvatar from "~/components/Misc/cAvatar.vue";
import { randomUsers } from "~/_devmode/generator/components/organisms/randomUsers.js";

export default {
	components: { ComponentsConstructor, cSwitcher, cAvatar },
	setup() {
		const userProfile = ref(null)
		const refreshUser = () => userProfile.value = randomUsers({q:1})[0]

		const options = {
			sizes: [
				{title: "Tiny", key: "tiny"},
				{title: "Small", key: "small"},
				{title: "Regular", key: "regular"},
				{title: "Big", key: "big"},
				{title: "Huge", key: "huge"}
			],
			shapes: [
				{title: "Circle", key: "circle"},
				{title: "Rounded", key: "rounded"},
				{title: "Square", key: "square"}
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
	// .grid
	// 	display: grid
	// 	gap: 2em
	// 	grid-template-columns: 1fr 1fr 1fr
</style>
