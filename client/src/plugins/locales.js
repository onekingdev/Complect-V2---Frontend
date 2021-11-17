import language from "~/data/locales/en-US.js";
export default {
	"install": ( app ) => {
		app.config.globalProperties.$locale = ( key, devmode ) => {
			try {
				if ( !language.dictionary[key]) throw new Error( `No translation found for "${key}"` );
				return language.dictionary[key];
			} catch ( error ) {
				if ( !devmode ) console.warn( error.message );
				return key;
			}
		};
		app.provide( "locale" );
	}
};
