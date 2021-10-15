import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AdminActivitiesProvider } from "../../contexts/AdminActivitiesContext";
import useI18nContext from "../../hooks/general/useI18nContext";
import Dialog from "../Dialog";
import AdminManageUsersFiltersForm from "./AdminManageUsersFiltersForm";
import UsersList from "../UsersList";
import BackButton from "../BackButton";
import useCurrentUserQuery from "../../hooks/auth/useCurrentUserQuery";
import { GoSettings } from "react-icons/go";
import PrimaryAndSecondaryTypography from "../PrimaryAndSecondaryTypography";
import useAdminActivitiesContext from "../../hooks/general/useAdminActivitiesContext";
import AdminManageActivitiesFiltersForm from "./AdminManageActivitiesFiltersForm";
import ActivitiesList from "../ActivitiesList";

export default function AdminManageUsers() {
	return (
		<AdminActivitiesProvider>
			<AdminManageActivitiesComponent />
		</AdminActivitiesProvider>
	);
}

function AdminManageActivitiesComponent() {
	const { query, toggleOpen, isOpen, updateQuery } =
		useAdminActivitiesContext();
	const { zIndex, palette, spacing } = useTheme();
	const { t } = useI18nContext();
	const { data: currentUserRegion } = useCurrentUserQuery({
		select: (d) => d?.region,
	});

	return (
		<>
			<BackButton />
			<PrimaryAndSecondaryTypography
				primary={t?.manageActivities}
				primaryProps={{ variant: "h3", style: { margin: 0 } }}
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
			</Box>
			<ActivitiesList query={query} />
			<Dialog
				open={isOpen}
				onClose={toggleOpen}
				title={t?.filterResults}
				maxWidth='xs'
				fullWidth
			>
				<AdminManageActivitiesFiltersForm
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
