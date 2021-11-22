import { createApp } from "vue";
import App from "./App.vue";
import Routes from "./router/Routes";
import Locale from "./plugins/locales";
import Toast from "./plugins/toast";
import Icon from "~/components/Icons/Icon.vue";
import cField from "~/components/Inputs/cField.vue";
import cButton from "~/components/Inputs/cButton.vue";
import cButtonModal from "~/components/Inputs/cButtonModal.vue";
import cCard from "~/components/Misc/cCard.vue";
import cToast from "~/components/Misc/cToast.vue";
import Table from "~/components/Table/flexTable.vue";
import documentsContainer from "~/components/Containers/DocumentsContainer.vue";
import documentContainer from "~/components/Containers/DocumentContainer.vue";
import "./assets/styles/index.styl";

createApp( App )
	.use( Routes )
	.use( Locale )
	.use( Toast )
	.component( "Icon", Icon )
	.component( "cButton", cButton )
	.component( "cButtonModal", cButtonModal )
	.component( "cField", cField )
	.component( "cCard", cCard )
	.component( "cToast", cToast )
	.component( "cTable", Table )
	.component( "documentsContainer", documentsContainer )
	.component( "documentContainer", documentContainer )
	.mount( "#app" );
