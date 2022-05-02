<template lang="pug">
.cell-access-person
	icon(v-if="data" name="success" size="big")
</template>


<script>
export default { "props": { "data": Boolean } };
</script>


<style lang="stylus" scoped>
.cell-access-person
	position: relative;
	left: 2.7em;
</style>
