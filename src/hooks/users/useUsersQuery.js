import { useQuery } from "react-query";
import { db } from "../../firebase";

export default function useUsersQuery(query, options) {
	return useQuery(
		["users", query ?? "all"],
		async () => {
			let usersRef = db.collection("users");

			if (!!query?.role) {
				usersRef = usersRef?.where("role", "==", query?.role);
			}

			if (!!query?.region) {
				usersRef = usersRef?.where("region", "==", query?.region);
			}

			if (!!query?.displayName) {
				usersRef = usersRef.where("displayName", "==", query?.displayName);
			}
			return usersRef
				.get()
				.then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() })));
		},
		{
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			...options,
		}
	);
}
