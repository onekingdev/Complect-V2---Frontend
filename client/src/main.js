import { createApp } from "vue";
import App from "./App.vue";
import Routes from "./router/Routes";
import Locale from "./plugins/locales";
import Toast from "./plugins/toast";
import cIcon from "~/components/Icons/cIcon.vue";
import cField from "~/components/Inputs/cField.vue";
import cTextarea from "~/components/Inputs/cTextarea.vue";
import cCheckbox from "~/components/Inputs/cCheckbox.vue";
import cButton from "~/components/Inputs/cButton.vue";
import cButtonModal from "~/components/Inputs/cButtonModal.vue";
import cCard from "~/components/Misc/cCard.vue";
import cToast from "~/components/Misc/cToast.vue";
import cTable from "~/components/Table/cTable.vue";
import documentsContainer from "~/components/Containers/DocumentsContainer.vue";
import documentContainer from "~/components/Containers/DocumentContainer.vue";
import directives from "~/directives/Index.js";
import "./assets/styles/index.styl";

const app = createApp( App );

directives( app );

app
	.use( Routes )
	.use( Locale )
	.use( Toast )
	.component( "Icon", cIcon )
	.component( "cButton", cButton )
	.component( "cButtonModal", cButtonModal )
	.component( "cField", cField )
	.component( "cTextarea", cTextarea )
	.component( "cCheckbox", cCheckbox )
	.component( "cCard", cCard )
	.component( "cToast", cToast )
	.component( "cTable", cTable )
	.component( "documentsContainer", documentsContainer )
	.component( "documentContainer", documentContainer )
	.mount( "#app" );
