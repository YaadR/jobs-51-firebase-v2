import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useActivitiesQuery from "../hooks/activity/useActivitiesQuery";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import CreateActivity from "./CreateActivity";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import UserActivitiesList from "./UserActivitiesList";
import UserHeader from "./UserHeader";
import UserStats from "./UserStats";

export default function Activity() {
	const { data: currentUserId } = useCurrentUserQuery({
		select: (v) => v?.id,
	});

	return (
		<>
			<UserHeader uid={currentUserId} />
			<UserStats uid={currentUserId} />
			<Divider sx={{ my: 4 }} />
			<UserActivitiesList uid={currentUserId} />
			<CreateActivity />
		</>
	);
}
