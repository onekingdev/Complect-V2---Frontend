<template lang="pug">
.c-form-wizard-step
	.c-form-wizard-step-title(v-if="title") {{title}}
	.c-form-wizard-step-content
		slot(name="default")
</template>


<script>
export default {
	"props": {
		"title": {
			"type": String,
			"default": "",
			"required": false
		}
	}
};
</script>
