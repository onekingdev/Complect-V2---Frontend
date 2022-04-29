const authServer = async ({ path, data }) => {
	try {
		const API_URI = import.meta.env.VITE_API_URI;
		const apiUrl = `${API_URI}/exam/${path}`;
		const options = {
			"method": "post",
			"mode": "cors",
			"cache": "no-cache",
			"headers": { "Content-Type": "application/json;charset=utf-8" },
			"body": JSON.stringify( data )
		};
		const response = await fetch( apiUrl, options );
		return await response.json();
	} catch ( error ) {
		console.error( error );
		return false;
	}
};

export default function useExam () {
	const addInviteEmail = async data => {
		const result = await authServer({ "path": "add-invite-email", data });
		if ( !result.ok ) throw result.message;
		return result;
	};

	return { addInviteEmail };
}
