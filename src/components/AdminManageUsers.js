import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import constants from "../constants";
import { AdminUsersProvider } from "../contexts/AdminUsersContext";
import useI18nContext from "../hooks/general/useI18nContext";
import useAdminUsersContext from "../hooks/general/useAdminUsersContext";
import Dialog from "./Dialog";
import Section from "./Section";
import AdminManageUsersFiltersForm from "./AdminManageUsersFiltersForm";
import UsersList from "./UsersList";

export default function AdminManageUsers() {
	return (
		<AdminUsersProvider>
			<AdminManageUsersComponent />
		</AdminUsersProvider>
	);
}

function AdminManageUsersComponent() {
	const { query, toggleOpen, isOpen, updateQuery } = useAdminUsersContext();
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
				<Button onClick={toggleOpen} variant='outlined'>
					{t?.filterResults}
				</Button>
			</Box>
			<UsersList query={query} />
			<Dialog
				open={isOpen}
				onClose={toggleOpen}
				title={t?.filterResults}
				maxWidth='lg'
				fullWidth
			>
				<AdminManageUsersFiltersForm
					defaultValues={query}
					onCancel={toggleOpen}
					onSubmit={(v) => {
						updateQuery(v);
						toggleOpen();
					}}
				/>
			</Dialog>
		</>
	);
}
