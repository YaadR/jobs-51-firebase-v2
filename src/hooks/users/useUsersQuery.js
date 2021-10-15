import { useQuery } from "react-query";
import { db } from "../../firebase";
import { useQueryClient } from "react-query";
import useI18nContext from "../general/useI18nContext";

export default function useUsersQuery(query, options) {
	const queryClient = useQueryClient();
	const { t } = useI18nContext();

	return useQuery(
		["users", query ?? "all"],
		async () => {
			let usersRef = db.collection("users");

			if (!!query?.role) {
				usersRef = usersRef?.where("role", "==", query?.role);
			}

			if (!!query?.region && query?.region !== t?.all) {
				usersRef = usersRef?.where("region", "==", query?.region);
			}

			if (!!query?.displayName) {
				usersRef = usersRef.where("displayName", "==", query?.displayName);
			}

			const data = await usersRef
				.get()
				.then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() })));

			data?.forEach((user) =>
				queryClient.setQueryData(["user", user?.id], user)
			);

			return data;
		},
		{
			refetchOnReconnect: false,
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			...options,
		}
	);
}
