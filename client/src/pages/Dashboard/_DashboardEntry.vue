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
import useData from "~/store/Data.js";
import cCalendar from "~/components/Calendar/cCalendar.vue";
import useProfile from "~/store/Profile.js";


export default {
	"components": { cCalendar },
	setup () {
		const { documents, readDocuments, clearStore } = useData( "projects" );
		const { profile } = useProfile();

		onMounted( () => readDocuments() );
		onUnmounted( () => clearStore() );
		return { profile, documents };
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
