<template lang="pug">
.avatar
	img(:src="user.photo")
</template>

<script>
export default {
	props: {
		user: {
			type: Object
		}
	}
};
</script>

<style lang="stylus" scoped>
.avatar
	background: #777
	width: 2em
	height: 2em
	border-radius: 50%
	overflow: hidden
	object-fit: cover
</style>
