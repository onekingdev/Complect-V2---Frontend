<template lang="pug">
.view.dashboard
	h1
		b Welcome,
		| {{userInfo.firstName}} {{userInfo.lastName}}
	Card
		template(v-slot:header) October
		template(v-slot:content)
			Calendar
	Card
		template(v-slot:header) Upcoming
</template>

<script>
import Card from "~/components/Misc/Card.vue";
import Calendar from "~/components/Misc/Calendar.vue";
import useUser from "~/store/User.js";
export default {
	components: {
		Card,
		Calendar
	},
	setup () {
		const { userInfo } = useUser();
		return { userInfo };
	}
};
</script>

<style lang="stylus" scoped>
.view.dashboard
	padding: 2em
	display: flex
	gap: 2em
	flex-wrap: wrap
	h1, .card
		flex: 1 0 auto
	h1
		width: 100%
</style>
