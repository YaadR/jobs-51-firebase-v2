import { Avatar, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import useI18nContext from "../hooks/general/useI18nContext";
import useUserQuery from "../hooks/users/useUserQuery";

import getUserHeaderSecondaryText from "../lib/helpers/getUserHeaderSecondaryText";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";

export default function UserHeader({ uid }) {
	const { t } = useI18nContext();
	const { data: user } = useUserQuery(uid);

	return (
		<>
			<Box display='flex' alignItems='center' justifyContent='space-between'>
				<Box>
					<PrimaryAndSecondaryTypography
						primaryProps={{ variant: "h4", gutterBottom: true }}
						primary={
							!!user ? (
								`${user?.firstName} ${user?.lastName}`
							) : (
								<Skeleton variant='text' width={80} />
							)
						}
						secondary={
							!!user ? (
								getUserHeaderSecondaryText(user, t)
							) : (
								<Skeleton variant='text' width={200} />
							)
						}
					/>
				</Box>
				{!!user ? (
					<Avatar
						src={user?.avatar}
						alt={`${user?.firstName} ${user?.lastName}`}
					/>
				) : (
					<Skeleton variant='circular' height={40} width={40} />
				)}
			</Box>
		</>
	);
}
