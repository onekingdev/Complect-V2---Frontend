import { reactive } from "vue";
import { randomMongoId } from "~/core/utils.js";

const notifications = reactive([
]);

export default function useUser () {
	const createNotification = ( options ) => {
		notifications.unshift({
			"id": randomMongoId(),
			"type": options.type || "info",
			"title": options.title || options.type || "info",
			"message": options.message || ""
		});
	};

	const deleteNotification = ( id ) => {
		const index = notifications.findIndex( item => item.id === id );
		notifications.splice( index, 1 );
	};

	const deleteAllNotifications = () => notifications.splice( 0, notifications.length );

	return {
		notifications,
		createNotification,
		deleteNotification,
		deleteAllNotifications
	};
}
