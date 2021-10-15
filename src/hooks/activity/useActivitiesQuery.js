import { useQuery, useQueryClient } from "react-query";
import { Activity } from "../../lib/API/models";
import getActivities from "../../lib/API/queries/getActivities";
import useI18nContext from "../general/useI18nContext";

export default function useActivitiesQuery(query, options, lastResult) {
	const queryClient = useQueryClient();
	const hookRef = useQuery(
		["activities", query],
		async () => getActivities(query, lastResult),
		options
	);

	return { ...hookRef };
}
