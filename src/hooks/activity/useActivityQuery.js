import { useQuery } from "react-query";
import { db } from "../../firebase";

export default function useActivityQuery(activityId) {
	return useQuery(["user-activity", activityId], () =>
		db
			.collection("activities")
			.doc(activityId)
			.get()
			.then((d) => ({ id: d.id, ...d.data() }))
	);
}
