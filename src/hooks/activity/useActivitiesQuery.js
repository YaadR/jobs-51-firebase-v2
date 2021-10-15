import { useQuery, useQueryClient } from "react-query";
import { Activity } from "../../lib/API/models";
import useI18nContext from "../general/useI18nContext";

export default function useActivitiesQuery(query, options) {
	const queryClient = useQueryClient();
	const { t } = useI18nContext();

	const hookRef = useQuery(
		["activities", query],
		async () => {
			let queryRef = Activity;

			if (query?.status === "pending") {
				queryRef = queryRef.where("approved", "==", false);
			}

			if (query?.status === "approved") {
				queryRef = queryRef.where("approved", "==", true);
			}

			if (!!query?.region && query?.region !== t?.all) {
				queryRef = queryRef.where("region", "==", query?.region);
			}

			const data = await queryRef
				// .limit(10)
				.get()
				.then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() })));

			data?.forEach((doc) =>
				queryClient.setQueryData(["user-activity", doc.id], doc)
			);

			return data;
		},
		options
	);

	return { ...hookRef };
}
