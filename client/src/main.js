import { createApp } from "vue";
import App from "./App.vue";
import Routes from "./router/Routes";
import Icon from "~/components/Icons/Icon.vue";
import cButton from "~/components/Controls/cButton.vue";
import "./assets/styles/index.styl";

createApp( App )
	.use( Routes )
	.component( "Icon", Icon )
	.component( "cButton", cButton )
	.mount( "#app" );
