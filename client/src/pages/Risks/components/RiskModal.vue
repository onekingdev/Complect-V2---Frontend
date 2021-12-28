<template lang="pug">
c-modal(:title="title" :modelValue="isModalVisible" @update:modelValue="update")
	template(#content)
		c-field(label="Risk Name" v-model="newRisk.name" required)
		label Risk Level
	template(#footer)
		c-button(title="Create" type="primary" @click="submit()")
</template>
<script>
import { reactive } from "vue";
import cModal from "~/components/Misc/cModal.vue";
export default {
	"components": { cModal },
	"props": {
		"title": {
			"type": String,
			"required": true
		},
		"risk": {
			"type": Object,
			"default": () => {},
			"required": false
		},
		"isModalVisible": {
			"type": Boolean,
			"required": true
		}
	},
	"emits": ["updateVisibleModal"],
	setup ( props, context ) {
		const newRisk = reactive({ "name": "" });

		const submit = () => {};

		const update = value => {
			context.emit( "updateVisibleModal", value );
		};

		return {
			newRisk,
			submit,
			update
		};
	}
};
</script>
