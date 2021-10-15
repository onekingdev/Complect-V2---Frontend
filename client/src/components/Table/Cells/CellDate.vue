<template lang="pug">
.cell-date {{ humanize(data) }}
</template>

<script>
export default {
	props: {
		data: {
			type: Number,
			required: true
		}
	},
	setup () {
		const options = {
			year: "numeric",
			month: "numeric",
			day: "numeric"
		};
		const humanize = date => new Date( date ).toLocaleString( "en-US", options );
		return { humanize };
	}
};
</script>

<style lang="stylus" scoped>
.cell-date
	text-align: right
</style>
