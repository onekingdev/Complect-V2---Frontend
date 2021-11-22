<template lang="pug">
documents-container(title="Tasks")
	template(#controls)
		c-button(title="Download")
		c-button(title="New Task" type="primary")
	template(#content)
		router-view
</template>
