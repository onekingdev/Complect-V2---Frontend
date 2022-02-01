import useModals from "~/store/Modals.js";
export default {
	"install": app => {
		const { createModal } = useModals();
		const modal = options => createModal( options );
		app.provide( "modal", modal );
	}
};
