<template lang="pug">
div
    h2 Display Settings
    p Select what you want to display on the cover page
    c-checkbox(v-for="(checkbox, index) in arrayCheckboxes" :key="index" :label="checkbox.label" type="checkbox" :value="checkbox.value" v-model="checkedValues" multiple)
    c-textarea(placeholder="Enter Something" v-model="discluserValue")
    c-button(title="Reset" @click="resetSettings()")
    c-button(title="Save" type="primary" @click="saveSettings()")
</template>


<script>
import { onMounted, onUnmounted, ref, inject } from "vue";
import useData from "~/store/Data.js";
import cBanner from "~/components/Misc/cBanner.vue";
import cModal from "~/components/Misc/cModal.vue";
import { useRoute, useRouter } from "vue-router";

export default {
	"components": { cBanner, cModal },
	setup () {
		const policies = new useData( "policies" );
		const route = useRoute();
		const router = useRouter();

		const notification = inject( "notification" );

		const checkedValues = ref([])
        const discluserValue = ref([])
		const arrayCheckboxes = [
			{label: "Address", value: "address"},
			{label: "Phone", value: "phone"},
			{label: "Email", value: "email"},
            {label: "Disclouser", value: "disclouser"}
		]

        const resetSettings = () => console.debug("Reset");
        const saveSettings = () => console.debug("Reset");

		onMounted( () => policies.readDocuments( ) );
		onUnmounted( () => policies.clearStore() );
		


		return {
			checkedValues,
			arrayCheckboxes,
            resetSettings,
            saveSettings,
            discluserValue
		};
	}
};
</script>


<style lang="stylus" scoped>
.rules-block
	font-size: 0.9em
	margin: 1em 0
</style>
