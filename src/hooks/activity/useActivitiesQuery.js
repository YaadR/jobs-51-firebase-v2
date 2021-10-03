import { useQuery, useQueryClient } from "react-query";
import { auth, db } from "../../firebase";

export default function useActivitiesQuery(uid = "") {
	const queryClient = useQueryClient();
	const userId = uid || auth.currentUser.uid;
	return useQuery(["user-activities", userId], async () => {
		const snapshot = await db
			.collection("activities")
			.where("uid", "==", userId)
      .orderBy('dateCreated', 'desc')
			.get();

		const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
		data?.forEach((activity) =>
			queryClient.setQueryData(["user-activity", activity?.id], activity)
		);
		return data;
	}, {
    refetchOnWindowFocus: false,
  });
}
