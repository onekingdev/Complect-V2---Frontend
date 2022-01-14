<template lang="pug">
.view.dashboard
	h1
		b {{$locale("Welcome")}},&nbsp;
		| {{profile.firstName}} {{profile.lastName}}
	c-card(title="December")
		template(#content)
			c-calendar
	c-card(title="Upcoming")
</template>


<script>
import cCalendar from "~/components/Misc/cCalendar.vue";
import useProfile from "~/store/Profile.js";
export default {
	"components": { cCalendar },
	setup () {
		const { profile } = useProfile();
		return { profile };
	}
};
</script>

<style lang="stylus" scoped>
.view.dashboard
	padding: 2em
	display: flex
	gap: 2em
	flex-wrap: wrap
	h1, .c-card
		flex: 1 0 auto
	h1
		width: 100%
</style>
