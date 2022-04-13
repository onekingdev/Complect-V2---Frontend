<template lang="pug">
.view.dashboard
	h1
		b {{$locale("Welcome")}},&nbsp;
		| {{profile.firstName}} {{profile.lastName}}
	c-calendar(:events="documents")
	card-container(title="Upcoming")
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
.view.dashboard
	padding: 2em
	display: flex
	gap: 2em
	flex-wrap: wrap
	h1, .card-container
		flex: 1 0 auto
	h1
		width: 100%
</style>
