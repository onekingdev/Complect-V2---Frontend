import fullData from "./components/templates/fullData.js";


const generatedData = () => {
	try {
		return fullData();
	} catch ( error ) {
		console.error( error );
	}
};

export { generatedData };
