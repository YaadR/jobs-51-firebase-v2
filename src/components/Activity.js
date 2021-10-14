import { Divider, Typography } from "@mui/material";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import CreateActivity from "./CreateActivity";
import UserActivitiesList from "./UserActivitiesList";
import UserBadges from "./UserBadges";
import UserHeader from "./UserHeader";
import UserStats from "./UserStats";

export default function Activity() {
	const { data: currentUserId } = useCurrentUserQuery({
		select: (v) => v?.id,
	});

	return (
		<>
			<UserHeader uid={currentUserId} />
			<UserBadges uid={currentUserId} />
			<Divider sx={{ my: 4 }} />
			<UserStats uid={currentUserId} />
			<Divider sx={{ my: 4 }} />
			<UserActivitiesList uid={currentUserId} />
			<CreateActivity />
		</>
	);
}
