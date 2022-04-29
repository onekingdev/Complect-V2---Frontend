<template lang="pug">
Editor(
	v-model="editorValue"
	model-events="change keydown blur focus paste"
	:init="{ height: 500, menubar: false, plugins: [ 'advlist autoresize autolink lists link image charmap print preview anchor' ], toolbar: 'bold italic underline strikethrough | formatselect | bullist numlist | outdent indent | undo redo' }")
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { computed } from "vue";
export default {
	"components": { Editor },
	"props": {
		"value": {
			"type": String,
			"required": true
		}
	},
	"emits": ["updateValue"],
	setup ( props, context ) {
		const editorValue = computed({
			// eslint-disable-next-line quote-props
			get: () => {
				if ( props.value ) return props.value;
				// eslint-disable-next-line
				else return '';
			},
			// eslint-disable-next-line quote-props
			set: value => context.emit( "updateValue", value )
		});
		return { editorValue };
	}
};
</script>
