import { manualApi } from "~/core/api";

const generatePDF = async data => {
	const response = await manualApi({ "method": "POST", "url": "pdf", data });
	return response;
};

export { generatePDF };
