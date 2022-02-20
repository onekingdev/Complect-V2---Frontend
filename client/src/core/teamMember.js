import useProfile from "~/store/Profile";

const authServer = async ({ path, data }) => {
	try {
		const API_URI = import.meta.env.VITE_API_URI;
		const apiUrl = `${API_URI}/team-member/${path}`;
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

export default function useTeamMember () {
	const { profile } = useProfile();

	const createUser = async data => {
		data.businessId = profile.value._id;
		const result = await authServer({ "path": "create", data });
		if ( !result.ok ) throw result.message;
	};

	const toggleDisable = async data => {
		const result = await authServer({ "path": "toggle-disable", data });
		if ( !result.ok ) throw result.message;
	};

	return {
		createUser,
		toggleDisable
	};
}
