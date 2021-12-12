<template lang="pug">
.c-button-modal
	c-button(:title="title" :type="type" @click="toggleModal()")
	c-modal(:title="modalTitle" v-model="isModalVisible" :displayBlock="displayBlock" :largeWidth="largeWidth")
		template(#content)
			slot(name="content")
		template(#left-footer)
			slot(name="left-footer")
		template(#footer)
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
		"displayBlock": {
			"type": Boolean,
			"default": false
		},
		"largeWidth": {
			"type": Boolean,
			"default": false
		},
		"disabled": Boolean,
		"modal": Boolean,
		"fullwidth": Boolean,
		"danger": Boolean,
		"devmode": Boolean
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
