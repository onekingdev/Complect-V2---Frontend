<template lang="pug">
page-container(title="Books and Records")
	template(#controls)
		//- c-button(title="Download" type="default" @click="downloadRecord()")
	template(#content)
		router-view
</template>

<script>

export default {
	setup () { return { }; }
};
</script>

