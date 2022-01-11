import { useTheme } from "@emotion/react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AdminUsersProvider } from "../../contexts/AdminUsersContext";
import useI18nContext from "../../hooks/general/useI18nContext";
import useAdminUsersContext from "../../hooks/general/useAdminUsersContext";
import Dialog from "../Dialog";
import AdminManageUsersFiltersForm from "./AdminManageUsersFiltersForm";
import UsersList from "../UsersList";
import { CSVLink } from "react-csv";
import getUsersCSV from "../../lib/helpers/getUsersCSV";
import BackButton from "../BackButton";
import useCurrentUserQuery from "../../hooks/auth/useCurrentUserQuery";
import { GoSettings } from "react-icons/go";
import { MdFileDownload } from "react-icons/md";
import PrimaryAndSecondaryTypography from "../PrimaryAndSecondaryTypography";
import useUsersQuery from "../../hooks/users/useUsersQuery";
import { useEffect, useState } from "react";
import useToggle from "../../hooks/general/useToggle";
import DownloadDialog from "../DownloadDialog";


export default function AdminManageUsers() {
	return (
		<AdminUsersProvider>
			<AdminManageUsersComponent />
		</AdminUsersProvider>
	);
}

function AdminManageUsersComponent() {
	const { query, toggleOpen,data, isOpen, updateQuery } = useAdminUsersContext();
	const { zIndex, palette, spacing } = useTheme();
	const { t } = useI18nContext();
	const { data: allUsers } = useUsersQuery(query);
	const { data: currentUserRegion } = useCurrentUserQuery({
		select: (d) => d?.region,
	});
	const [open, toggleDialog] = useToggle();

	return (
		<>
			<BackButton />
			<PrimaryAndSecondaryTypography
				primary={t?.manageUsers}
				primaryProps={{ variant: "h3", style: { margin: 0 } }}
				containerProps={{ py: 1 }}
			/>
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
				<Button
					startIcon={<GoSettings size={16} />}
					onClick={toggleOpen}
					variant='outlined'
				>
					{t?.filterResults}
				</Button>
				<Button
					startIcon={<MdFileDownload size={16} />}
					sx={{ mx: 1 }}
					variant='outlined'
					onClick={toggleDialog}
				>
					{t?.download}
				>
				</Button>
			</Box>
			<UsersList query={query} />
			<Dialog
				open={isOpen}
				onClose={toggleOpen}
				title={t?.filterResults}
				maxWidth='xs'
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
			{open && (
				<DownloadDialog
					open
					onClose={toggleDialog}
					data={allUsers}
					formatterFunction={getUsersCSV}
				/>
			)}
		</>
	);
}
