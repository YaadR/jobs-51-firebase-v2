import { useQuery, useQueryClient } from "react-query";
import { db } from "../../firebase";
import useCurrentUserQuery from "../auth/useCurrentUserQuery";

export default function useNotificationsQuery(options) {
	const queryClient = useQueryClient();
	const { data: currentUserId } = useCurrentUserQuery({
		select: (v) => v?.id,
	});
	const hookRef = useQuery(
		"notifications",
		async () => {
			const data = await db
				.collection("notifications")
				.where("uid", "==", currentUserId)
				.orderBy("dateCreated", "desc")
				.get()
				.then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() })));

			data?.forEach((doc) =>
				queryClient.setQueryData(["notification", doc?.id], doc)
			);

			return data;
		},
		options
	);

	return { ...hookRef };
}
