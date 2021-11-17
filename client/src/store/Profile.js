import { reactive } from "vue";
import { saveForm } from "~/core/utils";


const profile = reactive({
	"first_name": "John",
	"last_name": "Smith",
	"avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTMyfHxwZW9wbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
	"company_name": "",
	"crd_number": "",
	"aum": ""
});


export default function useProfile () {
	const updateProfile = update => saveForm( profile, update );

	return {
		profile,
		updateProfile
	};
}
