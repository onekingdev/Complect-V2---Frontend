<template lang="pug">
.view.dashboard
	h1
		b {{$locale("Welcome")}},&nbsp;
		| {{userInfo.firstName}} {{userInfo.lastName}}
	c-card(title="November")
		template(#content)
			Calendar
	c-card(title="Upcoming")
</template>


<script>
import Calendar from "~/components/Misc/Calendar.vue";
import useUser from "~/store/User.js";
export default {
	"components": { Calendar },
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
	h1, .c-card
		flex: 1 0 auto
	h1
		width: 100%
</style>
