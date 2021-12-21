<template lang="pug">
.file(v-for="(file, index) in files.value" :key="index")
	icon(name="document" size="huge")
	.file-name {{ file.name }}
	c-button(type="icon" iconL="close" size="small" @click="deleteFile(index)")
.upload-container(@dragover="dragover" @drop="drop")
	input(v-show="false" type="file" :multiple="multiple" :accept="accept" @change="onChange" ref="fileInput")
	p.text {{ text }}
	c-button.btn-upload(v-if="button" title="Upload File" @click="uploadFiles")
</template>
<script>
import { reactive, ref } from "vue";
export default {
	"props": {
		"modelValue": {
			"type": [
				Array, String
			],
			"default": ""
		},
		"button": {
			"type": Boolean,
			"required": false,
			"default": true
		},
		"accept": {
			"type": String,
			"required": false,
			"default": "*"
		},
		"multiple": Boolean
	},
	"emits": ["update:modelValue"],
	setup ( props, context ) {
		const files = reactive([]);
		const fileInput = ref( null );

		const text = props.button ? "Drag and drop files to upload" : "Drag and drop elements into the builder";

		const uploadFiles = () => fileInput.value.click();

		const onChange = () => {
			files.value = [...fileInput.value.files];
			context.emit( "update:modelValue", files );
		};

		const dragover = event => {
			event.preventDefault();
			// eslint-disable-next-line no-console
			console.log( "dragover event", event.target );
			const dragContainer = document.getElementsByClassName( "upload-container" )[0];
			dragContainer.classList.add( "drag-over" );
		};

		const drop = event => {
			event.preventDefault();
			const dragContainer = document.getElementsByClassName( "upload-container" )[0];
			dragContainer.classList.remove( "drag-over" );
			fileInput.value.files = event.dataTransfer.files;
			onChange();
		};

		const deleteFile = index => {
			files.value.splice( index, 1 );
			context.emit( "update:modelValue", files );
		};

		return {
			text,
			fileInput,
			files,
			uploadFiles,
			onChange,
			dragover,
			drop,
			deleteFile
		};
	}
};
</script>

<style lang="stylus" scoped>
.file
  border: solid 1px var(--c-border)
  background-color: var(--c-bg-light-active)
  padding: 0.5em
  display: flex
  align-items: center
  svg.icon
    flex-shrink: 0
  .file-name
    font-size: 0.8em
    margin: 0 0.5em
.upload-container
  text-align: center
  padding: 1em
  width: 100%
  background: var(--c-bg-f0)
  border: 0.15em dashed var(--c-selected)
  box-sizing: border-box
  border-radius: var(--v-inputs-border-radius)
  cursor: pointer
	.text
    font-size: 0.8em
    color: var(--c-blue)
  .btn-upload
    margin: 0.5em auto
	.drag-over
		border-color:  var(--c-warning)
</style>
