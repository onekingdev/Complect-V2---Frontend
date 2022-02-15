<template lang="pug">
.bar.devbar
	c-button(title="Generate" type="primary" @click="generateData()")
</template>


<script>
// import useApi from "~/core/api.js";
import useData from "~/store/Data.js"
import { appState } from "~/store/appState"
import { generatedData } from "~/_devmode/generator/generator.js";
export default {
	setup () {
		const databaseName = "dev";
		
		// post collections to API
		const postCollections = async ( databaseName, collections ) => {
			try {
				const collectionsNames = Object.keys( collections );
				for ( const collectionName of collectionsNames ) {
					const result = await useApi({
						method: "post",
						databaseName,
						collectionName,
						newDocuments: collections[collectionName]
					});
					if ( !result.ok ) throw new Error( `Data not saved: ${collectionName}` );
				}
				return "Saved";
			} catch ( error ) {
				console.error( error );
			}
		};

		const generateData = async () => {
			const collections = await generatedData();
			await postCollections(collections);
			// console.log(collections)
		};

		return { generateData, appState };
	}
};
</script>

<style lang="stylus" scoped>
.bar.devbar
	font-size: 1rem
	color: #fff
	padding: 1em
	background: #16171e
	border-top: 1px solid #222
	display: flex
	gap: 1em
	align-items: center
</style>
