import { generatedData } from "~/data/generator/Generator.js";
import { postCollections } from "~/helpers/devUtils.js";

export default function useDev () {
	const databaseName = "dev";
	const generateData = async () => {
		const collections = await generatedData();
		await postCollections( databaseName, collections );
	};
	return { generateData };
}
