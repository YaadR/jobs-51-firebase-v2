import { useTheme } from "@emotion/react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AdminActivitiesProvider } from "../../contexts/AdminActivitiesContext";
import useI18nContext from "../../hooks/general/useI18nContext";
import Dialog from "../Dialog";
import BackButton from "../BackButton";
import useCurrentUserQuery from "../../hooks/auth/useCurrentUserQuery";
import { GoSettings } from "react-icons/go";
import { MdFileDownload } from "react-icons/md";
import PrimaryAndSecondaryTypography from "../PrimaryAndSecondaryTypography";
import useAdminActivitiesContext from "../../hooks/general/useAdminActivitiesContext";
import AdminManageActivitiesFiltersForm from "./AdminManageActivitiesFiltersForm";
import ActivitiesList from "../ActivitiesList";
import { CSVLink } from "react-csv";
import getActivitiesCSV from "../../lib/helpers/getActivitiesCSV";
import useUsersQuery from "../../hooks/users/useUsersQuery";

export default function AdminManageUsers() {
	return (
		<AdminActivitiesProvider>
			<AdminManageActivitiesComponent />
		</AdminActivitiesProvider>
	);
}

function AdminManageActivitiesComponent() {
	const { query, toggleOpen, data, isOpen, updateQuery } =
		useAdminActivitiesContext();
	const { zIndex, palette, spacing } = useTheme();
	const { t } = useI18nContext();
	const { data:users } = useUsersQuery();
	const { data: currentUserRegion } = useCurrentUserQuery({
		select: (d) => d?.region,
	});

	return (
		<>
			<BackButton />
			<PrimaryAndSecondaryTypography
				primary={t?.manageActivities}
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
				>
					<CSVLink data={getActivitiesCSV(data, t, users)}>
						{t?.download}
					</CSVLink>
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
						status: "all",
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
