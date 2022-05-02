import { config } from "@vue/test-utils";

import Icon from "~/components/Icons/cIcon.vue";
import cButton from "~/components/Inputs/cButton.vue";

config.global.mocks = {
	$locale: key => key
}

config.global.components = {
	Icon,
	cButton
}