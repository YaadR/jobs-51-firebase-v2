import { Skeleton, Typography } from "@mui/material";
import List from "@mui/material/List";
import useActivityQuery from "../hooks/activity/useActivitiesQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import useUserQuery from "../hooks/users/useUserQuery";
import EmptyState from "./EmptyState";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import UserActivityListItem from "./UserActivityListItem";

export default function UserActivitiesList({ uid }) {
	const { data } = useActivityQuery(uid);
	const { t } = useI18nContext();
	const { data: currentUserRegion } = useUserQuery(uid, {
		select: (v) => v?.region,
	});

	if (data?.length === 0)
		return (
			<EmptyState
				renderBefore={
					<Typography component='span' variant='h1'>
						📝
					</Typography>
				}
				containerProps={{ pt: 1, style: { textAlign: "center" } }}
				primary={t?.clickAndAddPrimary}
				secondary={t?.clickAndAddSecondary}
			/>
		);

	return (
		<>
			<PrimaryAndSecondaryTypography
				primary={
					!!currentUserRegion ? (
						t?.latestActivities
					) : (
						<Skeleton variant='text' width={120} />
					)
				}
				secondary={
					!!currentUserRegion ? (
						`${t?.recentActivitiesInRegion} ${currentUserRegion}`
					) : (
						<Skeleton />
					)
				}
			/>
			<List disablePadding>
				{data?.map((a) => (
					<UserActivityListItem activityId={a?.id} key={a?.id} />
				))}
			</List>
		</>
	);
}
