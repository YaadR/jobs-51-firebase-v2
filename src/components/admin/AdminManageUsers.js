import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AdminUsersProvider } from "../../contexts/AdminUsersContext";
import useI18nContext from "../../hooks/general/useI18nContext";
import useAdminUsersContext from "../../hooks/general/useAdminUsersContext";
import Dialog from "../Dialog";
import AdminManageUsersFiltersForm from "./AdminManageUsersFiltersForm";
import UsersList from "../UsersList";
import BackButton from "../BackButton";
import useCurrentUserQuery from "../../hooks/auth/useCurrentUserQuery";
import { GoSettings } from "react-icons/go";
import PrimaryAndSecondaryTypography from "../PrimaryAndSecondaryTypography";

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
	const { data: currentUserRegion } = useCurrentUserQuery({
		select: (d) => d?.region,
	});

	return (
		<>
			<Box
				sx={{
					position: "sticky",
					top: 0,
					paddingTop: spacing(1),
					paddingBottom: spacing(1),
					zIndex: zIndex.appBar,
					backgroundColor: palette.background.paper,
					borderBottom: `1px solid ${palette.divider}`,
				}}
			>
				<BackButton />
				<PrimaryAndSecondaryTypography
					primary={t?.manageUsers}
					primaryProps={{ variant: "h3", style: { margin: 0 } }}
				/>
				<Button
					startIcon={<GoSettings size={16} />}
					onClick={toggleOpen}
					variant='outlined'
				>
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
					defaultValues={{
						region: currentUserRegion,
						...query,
					}}
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
