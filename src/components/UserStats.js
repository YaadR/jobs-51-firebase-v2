import { useTheme } from "@emotion/react";
import { ListItem, ListItemIcon, ListItemText, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import useActivitiesQuery from "../hooks/activity/useActivitiesQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import useUserQuery from "../hooks/users/useUserQuery";
import getUserActivityStats from "../lib/helpers/getUserActivityStats";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

export default function UserStats({ uid }) {
	const { data: user } = useUserQuery(uid);
	const { palette } = useTheme();
	const { t } = useI18nContext();
	const { data: activities } = useActivitiesQuery(uid);

	return (
		<>
			<PrimaryAndSecondaryTypography
				primary={
					!!user ? (
						t?.totalActivityHours
					) : (
						<Skeleton variant='text' width={104} />
					)
				}
				secondary={
					!!user ? (
						`${t?.totalActivitiesInRegion} ${user?.region}`
					) : (
						<Skeleton variant='text' width={120} />
					)
				}
			/>
			<Box>
				{getUserActivityStats(activities)?.map((stat) => (
					<ListItem>
						<ListItemIcon>
							{stat?.label === "approved" && (
								<AiOutlineCheckCircle size={24} color={palette.primary.main} />
							)}
							{stat?.label === "pending" && (
								<AiOutlineCloseCircle size={24} color={palette.text} />
							)}
						</ListItemIcon>
						<ListItemText
							primary={
								!!user ? (
									`${t?.[stat.label]} ${stat.value}`
								) : (
									<Skeleton variant='text' width={144} />
								)
							}
						/>
					</ListItem>
				))}
			</Box>
		</>
	);
}
