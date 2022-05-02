<template lang="pug">
card-container(title="Constructor")
	template(#content)
		component-constructor
			template(#preview)
				.collection
					c-dropzone(:button="false" accept="image/*" v-model="files")
					c-dropzone(:button="true" accept="image/*" v-model="files")
</template>


<script>
import { ref } from "vue";
import ComponentConstructor from "~/_devmode/misc/ComponentConstructor.vue";
import cDropzone from "~/components/Inputs/cDropzone.vue";

export default {
	components: { ComponentConstructor, cDropzone },
	setup() {
		const files = ref([])

		return { files }
	}
};
</script>


<style lang="stylus" scoped>
.collection
	width: 100%
	display: flex
	flex-direction: column
	gap: 1em
</style>