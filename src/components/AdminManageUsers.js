import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import constants from "../constants";
import { AdminUsersProvider } from "../contexts/AdminUsersContext";
import useI18nContext from "../hooks/general/useI18nContext";
import AdminListFilters from "./AdminListFilters";

export default function AdminManageUsers() {
	return (
		<AdminUsersProvider>
			<AdminManageUsersComponent />
		</AdminUsersProvider>
	);
}

function AdminManageUsersComponent() {
	const { zIndex, palette, spacing } = useTheme();
	const { t } = useI18nContext();

	return (
		<>
			<Box
				sx={{
					position: "sticky",
					top: spacing(1),
					paddingBottom: spacing(1),
					zIndex: zIndex.appBar,
					backgroundColor: palette.background.paper,
					borderBottom: `1px solid ${palette.divider}`,
				}}
			>
				<Typography variant='h3' gutterBottom>
					{t?.manageUsers}
				</Typography>
				<AdminListFilters
					options={[
						{
							label: t?.fullName,
              isSearchable: true,
							options: ["Alon Zuman", "Nir Peleg"],
						},
						{
							label: t?.region,
							options: constants.REGIONS,
						},
						{
							label: t?.role,
							options: Object.values(constants.ROLES),
						},
					]}
				/>
			</Box>
			<div style={{ height: 4000 }} />
		</>
	);
}
