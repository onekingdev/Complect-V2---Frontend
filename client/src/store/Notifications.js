import { reactive } from "vue";
import { randomId } from "~/core/utils.js";

const notifications = reactive([]);

export default function useNotifications () {
	const createNotification = options => {
		notifications.unshift({
			"id": options.id || randomId(),
			"type": options.type || "success",
			"title": options.title || options.type || "success",
			"message": options.message || "",
			"autoClose": options.autoClose,
			"actions": options.actions
		});
	};

	const deleteNotification = id => {
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
