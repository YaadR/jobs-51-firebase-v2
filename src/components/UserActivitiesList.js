import List from "@mui/material/List";
import useActivityQuery from "../hooks/activity/useActivitiesQuery";
import UserActivityListItem from "./UserActivityListItem";

export default function UserActivitiesList({ uid }) {
	const { data } = useActivityQuery(uid);

	return (
		<List>
			{data?.map((a) => (
				<UserActivityListItem activityId={a?.id} key={a?.id} />
			))}
		</List>
	);
}
