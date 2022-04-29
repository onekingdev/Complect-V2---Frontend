<template lang="pug">
.c-input.c-dropzone
	.files-container
		.file(v-for="(file, index) in files" :key="index")
			icon(name="document" size="huge")
			.file-name {{ file.name }}
			c-button(type="icon" iconL="close" size="small" @click="deleteFile(index)")
	.upload-container(@dragover="dragover" @drop="drop" :class="{ 'drag-over': isDragover }")
		input(v-show="false" type="file" :multiple="multiple" :accept="accept" @change="onChange" ref="fileInput")
		p.text {{ text }}
		c-button(v-if="button" title="Upload File" @click="uploadFiles")
</template>


<script>
import { reactive, ref } from "vue";
export default {
	"props": {
		"text": {
			"type": String,
			"default": "Drag and drop files to upload"
		},
		"modelValue": {
			"type": [
				Array, String
			],
			"default": ""
		},
		"button": {
			"type": Boolean,
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
		const isDragover = ref( false );

		const uploadFiles = () => fileInput.value.click();

		const onChange = () => {
			const file = fileInput.value.files[0];
			files.push( file );
			context.emit( "update:modelValue", files );
		};

		const dragover = event => {
			event.preventDefault();
			// isDragover.value = true;
		};

		const drop = event => {
			event.preventDefault();
			fileInput.value.files = event.dataTransfer.files;
			onChange();
		};

		const deleteFile = index => {
			files.splice( index, 1 );
			context.emit( "update:modelValue", files );
		};

		return {
			fileInput,
			files,
			uploadFiles,
			onChange,
			isDragover,
			dragover,
			drop,
			deleteFile
		};
	}
};
</script>


<style lang="stylus" scoped>
.c-input.c-dropzone
	width: 100%
	.files-container
		margin-bottom: 1em
		.file
			border: solid 1px var(--c-border)
			background-color: var(--c-bg-light-active)
			padding: 0.5em
			display: flex
			align-items: center
			+ .file
				margin-top: 0.5em
			svg.icon
				flex-shrink: 0
			.file-name
				flex: 1
				font-size: 0.8em
				margin: 0 0.5em
	.upload-container
		text-align: center
		padding: 2em 1em
		width: 100%
		background: var(--c-bg-f0)
		border: 0.15em dashed var(--c-selected)
		box-sizing: border-box
		border-radius: var(--v-inputs-border-radius)
		cursor: pointer
		.text
			font-size: 0.9em
			color: var(--c-blue)
		.c-button
			margin: 1em auto
		&.drag-over
			border-color:  var(--c-warning)
</style>
