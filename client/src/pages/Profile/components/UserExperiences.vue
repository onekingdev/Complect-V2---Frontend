<template lang="pug">
div
  div.experiences(v-for="(item, index) in userExperiences" :key="index")
    div.experiences-item
      div.title
        h3.col-4 {{ item.title }}
        c-button(title="Delete" @click="confirmDeleteExperience(item._id)")
        c-button(title="Edit" type="primary" @click="editExperience(item._id)")
      div.smallText {{ item.employer }} | {{ formatDate(item.startsAt) }} - {{ item.isPresent ? "Present" : formatDate(item.endsAt) }}
      div.smallText {{ item.description }}
c-button.btn-new-experience(title="New Experience" iconL="circle_plus" @click="openExperienceModal()")
</template>
<script>
import { ref, inject, onMounted } from "vue";
import cModalExperience from "~/components/Modals/cModalExperience.vue";
import cModalDelete from "~/components/Modals/cModalDelete.vue";
import useData from "~/store/Data.js";
import { formatDate } from "~/core/utils.js";

export default {
	"components": {
		cModalExperience,
		cModalDelete
	},
	setup () {
		const modal = inject( "modal" );
		const editExperienceId = ref( null );
		const userExperiences = ref([]);

		const { documents, readDocuments } = useData( "user_experiences" );

		const openExperienceModal = id => modal({ "name": "cModalExperience", id });
		const editExperience = id => openExperienceModal( id );
		const getExperienceData = async () => {
			await readDocuments();
			userExperiences.value = documents.value;
		};

		const confirmDeleteExperience = id => {
			modal({
				"name": "cModalDelete",
				id,
				"title": "Experience",
				"description": "You are deleting a record of your work experience.",
				"collection": "user_experiences"
			});
		};

		onMounted( () => {
			getExperienceData();
		});

		return {
			editExperienceId,
			userExperiences,
			editExperience,
			confirmDeleteExperience,
			openExperienceModal,
			formatDate
		};
	}
};
</script>

<style lang="stylus" scoped>
.btn-new-experience
  max-width: 12em;
.experiences
  .experiences-item
    padding: 1em;
    margin: 1em 0;
    border-radius: 0.4em;
    border: 1px solid var(--c-border, #dcdee4)
    .title
      display: flex;
      .c-button
        margin: 0 0.5em;
      h3
        flex-grow: 1;
    .smallText
      font-size: 0.96em;
</style>
