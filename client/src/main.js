import { createApp } from "vue";
import App from "./App.vue";
import Routes from "./router/Routes";
import Locale from "./plugins/locales";
import Icon from "~/components/Icons/Icon.vue";
import cField from "~/components/Inputs/cField.vue";
import cButton from "~/components/Inputs/cButton.vue";
import "./assets/styles/index.styl";

createApp( App )
	.use( Routes )
	.use( Locale )
	.component( "Icon", Icon )
	.component( "cButton", cButton )
	.component( "cField", cField )
	.mount( "#app" );
