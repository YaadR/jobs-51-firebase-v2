import { useMutation } from "react-query";
import { db } from "../../firebase";
import useCurrentUserQuery from "../auth/useCurrentUserQuery";

export default function useCreateNotificationMutation(options) {
	const { data } = useCurrentUserQuery();
	const hookRef = useMutation(
		(v) =>
			db.collection("notifications").add({
				...v,
				seen: false,
				dateCreated: Date.now(),
				notificationBy: {
					avatar: data?.avatar,
					displayName: data?.displayName,
					uid: data?.id,
				},
			}),
		options
	);

	return { ...hookRef };
}
