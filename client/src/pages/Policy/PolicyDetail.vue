<template lang="pug">
card-container(title="Policy Details")
	template(#content)
		c-field( label="Name" placeholder="Name" size="small" v-model="policyDetails.name")
		c-field( label="Description" placeholder="Description" size="small" )

</template>
<script>
import { onMounted, onUnmounted, ref, inject, computed } from "vue";
import useData from "~/store/Data.js";
import definitionList from "~/components/Misc/DefinitionList.vue";
import { useRoute, useRouter } from "vue-router";
export default {
	"components": { definitionList },
	props: {
		policyDetails: {
			required: true,
			default: {}
		}
	},
	"emits": ["update:policyDetails"],
	setup (props, context) {
		// const policies = new useData( "policies" );
		// const handleClickDelete = id => console.debug( id );
		// const addControl = () => console.debug( "Add" );
		const route = useRoute();
		const router = useRouter();

		const policyDetails = computed( () => (props.policyDetails) );
		

		return {
			policyDetails
		};
	}
};
</script>
