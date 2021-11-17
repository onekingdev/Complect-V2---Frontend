<template lang="pug">
.input.c-upload
	.preview(@click="selectImage()")
		img(v-if="modelValue" :src="modelValue" )
	.controls
		input(type="file" accept="image/*" ref="fileInput" @input="uploadImage()")
		c-button(@click="selectImage()" title="Upload" fullwidth)
		c-button(@click="removeImage()" title="Remove" type="link" fullwidth)
</template>


<script>
import { ref } from "vue";
export default {
	"props": {
		"modelValue": {
			"type": String,
			"default": ""
		}
	},
	"emits": [
		"update:modelValue"
	],
	setup ( props, context ) {
		const fileInput = ref( null );

		const selectImage = () => fileInput.value.click(); // call click event on real input

		const uploadImage = () => {
			try {
				const image = fileInput.value.files[0];
				if ( image ) {
					const reader = new FileReader();
					reader.readAsDataURL( image );
					reader.onload = event => context.emit( "update:modelValue", event.target.result );
					reader.onerror = () => {
						throw new Error( reader.error );
					};
				}
			} catch ( error ) {
				console.log( error );
			}
		};


		const removeImage = () => {
			context.emit( "update:modelValue", null );
		};
		return {
			fileInput,
			selectImage,
			uploadImage,
			removeImage
		};
	}
};
</script>


<style lang="stylus" scoped>
.input.c-upload
	display: flex
	gap: 2em
	.preview
		width: 6em
		height: 6em
		overflow: hidden
		cursor: pointer
		box-shadow: 0 0 0 1px var(--c-border)
		border-radius: var(--v-border-radius)
		&:hover
			img
				transform: scale(1.1)
		img
			width: 100%
			height: 100%
			object-fit: cover
			transition: transform var(--fx-duration-regular, .25s) ease-in-out
	.controls
		input[type="file"]
			display: none

		.c-button
			margin-bottom: 0.5em

</style>
