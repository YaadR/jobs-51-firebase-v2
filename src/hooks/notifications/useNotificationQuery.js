import { useQuery } from "react-query";
import { db } from "../../firebase";

export default function useNotificationQuery(notificationId, options) {
	return useQuery(
		["notification", notificationId],
		() =>
			db
				.collection("notifications")
				.doc(notificationId)
				.get()
				.then((d) => ({ id: d.id, ...d.data() })),
		options
	);
}
