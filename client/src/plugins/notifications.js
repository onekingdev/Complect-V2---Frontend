import useNotifications from "~/store/Notifications.js";
export default {
	"install": app => {
		const { createNotification } = useNotifications();
		const notification = options => createNotification( options );
		app.provide( "notification", notification );
	}
};
