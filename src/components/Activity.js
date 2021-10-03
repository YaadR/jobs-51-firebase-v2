import useActivitiesQuery from "../hooks/activity/useActivitiesQuery";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import CreateActivity from "./CreateActivity";
import UserActivitiesList from "./UserActivitiesList";
import UserHeader from "./UserHeader";

export default function Activity() {
	const { data: currentUserId } = useCurrentUserQuery({
		select: (v) => v?.id,
	});
	const { data } = useActivitiesQuery();

	return (
		<>
			<UserHeader uid={currentUserId} />
			<UserActivitiesList uid={data?.id} />
      <CreateActivity />
		</>
	);
}
