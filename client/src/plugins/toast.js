import useNotifications from "~/store/Notifications.js";
export default {
	"install": ( app ) => {
		const { createNotification } = useNotifications();
		const toast = options => createNotification( options );
		app.provide( "toast", toast );
	}
};
