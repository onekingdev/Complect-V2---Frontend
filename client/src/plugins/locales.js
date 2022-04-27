import language from "~/data/locales/en-US.js";

export default {
	"install": app => {
		const locale = key => {
			try {
				if ( !language.dictionary[key]) throw new Error( `No translation found for "${key}"` );
				return language.dictionary[key];
			} catch ( error ) {
				// console.warn( error.message );
				return key;
			}
		};
		app.config.globalProperties.$locale = locale;

		app.provide( "locale", locale );
	}
};
