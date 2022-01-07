<template lang="pug">
.c-button-modal
	c-button(:title="title" :type="type" @click="toggleModal()")
	c-modal(:title="modalTitle" v-model="isModalVisible" :wide="wide")
		template(#content v-if="$slots.content")
			slot(name="content")
		template(#left-footer v-if="$slots['left-footer']")
			slot(name="left-footer")
		template(#footer v-if="$slots.footer")
			slot(name="footer")
</template>


<script>
import { ref } from "vue";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { cModal },
	"props": {
		"icon": {
			"type": String,
			"default": "",
			"required": false
		},
		"title": {
			"type": String,
			"default": "",
			"required": false
		},
		"modalTitle": {
			"type": String,
			"default": "",
			"required": false
		},
		"type": {
			"type": String,
			"default": "default",
			"required": false
		},
		"size": {
			"type": String,
			"default": "regular",
			"required": false
		},
		"wide": Boolean,
		"disabled": Boolean,
		"fullwidth": Boolean
	},
	setup () {
		const isModalVisible = ref( false );
		const toggleModal = () => {
			isModalVisible.value = !isModalVisible.value;
		};
		return {
			toggleModal,
			isModalVisible
		};
	}
};
</script>
