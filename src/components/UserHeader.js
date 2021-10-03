import {
	Avatar,
	Typography,
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemIcon,
} from "@mui/material";
import { Box } from "@mui/system";
import useActivitiesQuery from "../hooks/activity/useActivitiesQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import useUserQuery from "../hooks/users/useUserQuery";
import getUserActivityStats from "../lib/helpers/getUserActivityStats";
import getUserHeaderSecondaryText from "../lib/helpers/getUserHeaderSecondaryText";

export default function UserHeader({ uid }) {
	const { data: user } = useUserQuery(uid);
	const { data: activities } = useActivitiesQuery(uid);
	const { t } = useI18nContext();

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between'>
				<Box>
					<Typography variant='h5'>
						{user?.firstName} {user?.lastName}
					</Typography>
					<Typography variant='body1' color='text.secondary'>
						{getUserHeaderSecondaryText(user, t)}
					</Typography>
				</Box>
				<Avatar
					src={user?.avatar}
					alt={`${user?.firstName} ${user?.lastName}`}
				/>
			</Box>
			<Box>
				{getUserActivityStats(activities, t)?.map((stat) => (
					<ListItem>
						<ListItemIcon></ListItemIcon>
						<ListItemText primary={`${stat.label} ${stat.value}`} />
					</ListItem>
				))}
			</Box>
		</>
	);
}
