<template lang="pug">
.view
	h1
		b {{$locale("Welcome")}},&nbsp;
		| {{profile.firstName}} {{profile.lastName}}
	.dashboard
		.calendar
			c-calendar(:events="documents")
		card-container.upcoming(title="Upcoming")
</template>


<script>
import { onMounted, onUnmounted } from "vue";
import UseData from "~/store/Data.js";
import cCalendar from "~/components/Calendar/cCalendar.vue";
import useProfile from "~/store/Profile.js";


export default {
	"components": { cCalendar },
	setup () {
		const projects = new UseData( "projects" );
		const { profile } = useProfile();

		onMounted( () => projects.readDocuments() );
		onUnmounted( () => projects.clearStore() );
		return { profile, "documents": projects.getDocuments() };
	}
};
</script>

<style lang="stylus" scoped>
.view
	padding: 2em
	display: flex
	gap: 1.25em
	flex-wrap: wrap
	h1
		flex: 1 0 auto
	h1
		width: 100%
	.dashboard
		display: flex
		gap: 1.25em
		@media (max-width: 1200px)
			flex-direction: column
		.calendar
			min-width: 44em
		.upcoming
			flex: 1 3 22em
			min-width: 22em
			@media (max-width: 1200px)
				flex: 1
</style>
