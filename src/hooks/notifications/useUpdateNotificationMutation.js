import { useMutation } from "react-query";
import { db } from "../../firebase";

export default function useUpdateNotificationMutation(notificationId, options) {
	const hookRef = useMutation(
		(v) => db.collection("notifications").doc(notificationId).update(v),
		options
	);

	return { ...hookRef };
}
