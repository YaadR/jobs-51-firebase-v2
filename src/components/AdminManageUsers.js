import { useTheme } from "@emotion/react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import constants from "../constants";
import { AdminUsersProvider } from "../contexts/AdminUsersContext";
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

	return (
		<>
			<Box
				sx={{
					position: "sticky",
					top: spacing(1),
          paddingBottom: spacing(1),
					zIndex: zIndex.appBar,
					backgroundColor: palette.background.paper,
          borderBottom: `1px solid ${palette.divider}`
				}}
			>
				<Typography variant='h3' gutterBottom>
					Admin Manage Users
				</Typography>
				<AdminListFilters options={options} />
			</Box>
			<div style={{ height: 4000 }} />
		</>
	);
}

const options = [
	{
		label: "fullName",
		options: ["Alon Zuman", "Nir Peleg"],
	},
	{
		label: "region",
		options: constants.REGIONS,
	},
	{
		label: "role",
		options: Object.values(constants.ROLES),
	},
];
