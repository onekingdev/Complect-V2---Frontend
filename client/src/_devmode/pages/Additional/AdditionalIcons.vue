<template lang="pug">
card-container(title="Icons")
	template(#controls)
		c-field(icon type="search" v-model="searchQuery" placeholder="Search...")
	template(#content)
		component-constructor
			template(#controls)
				c-switcher(id="icon-sizes" label="Size" :options="sizes" v-model="selectedSize" fullwidth)
			template(#code)
				code {{code}}
			template(#preview)
				.icons-grid
					.icon-cell(v-for="(icon, index) in filteredIcons" @click="selectIcon(icon.icon)" :key="index")
						icon(:name="icon.icon" :size="selectedSize")
						.title {{icon.icon}}
</template>


<script>
import { ref, computed } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cSwitcher from "~/components/Inputs/cSwitcher.vue";
import { icons } from "~/_devmode/misc/iconsList.js";
export default {
	components: { ComponentConstructor, cSwitcher },
	setup() {
		const sizes = [
			{title: "Tiny", value: "tiny"},
			{title: "Small", value: "small"},
			{title: "Regular", value: "regular"},
			{title: "Big", value: "big"},
			{title: "Huge", value: "huge"}
		]
		
		const searchQuery = ref("")
		const selectedSize = ref("huge")
		const selectedIcon = ref("logo")
		const selectIcon = key => selectedIcon.value = key

		const filteredIcons = computed( () => {
			try {
				if ( !searchQuery.value ) return icons;
				const query = String( searchQuery.value.toLowerCase().trim() );
				return icons.filter( icon => icon.icon.toLowerCase().includes( query ) );
			} catch ( error ) {
				console.error( error );
				return icons;
			}
		});

		const code = computed(() => {
			let name = selectedIcon.value !== 'blank'? `name="${selectedIcon.value}"` : ""
			let size = selectedSize.value !== 'regular' ? `size="${selectedSize.value}"` : ""
			return `icon(${name} ${size})`
		})
		return { searchQuery, filteredIcons, sizes, selectedSize, selectIcon, code }
	}
};
</script>


<style lang="stylus" scoped>
.icons-grid
	display: grid
	width: 100%
	grid-template-columns: repeat(auto-fit, minmax(4em, 1fr))
	gap: 1em
	.icon-cell
		text-align: center
		cursor: pointer
		padding: 0.5em
		&:hover
			background: #f5f5f5
		.title
			margin-top: 0.5em
			font-size: 0.7em
			line-height: 1.2
</style>
