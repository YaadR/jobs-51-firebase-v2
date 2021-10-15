import { CircularProgress, List } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/system";
import useActivitiesQuery from "../hooks/activity/useActivitiesQuery";
import useAdminActivitiesContext from "../hooks/general/useAdminActivitiesContext";
import useI18nContext from "../hooks/general/useI18nContext";
import EmptyState from "./EmptyState";
import UserActivityListItem from "./UserActivityListItem";

export default function ActivitiesList({ query }) {
	const { data, isLoading, fetchMore } = useActivitiesQuery(query);
	const { t } = useI18nContext();

	return (
		<>
			<List>
				{isLoading && (
					<Box py={4} display='flex' justifyContent='center'>
						<CircularProgress size={24} />
					</Box>
				)}
				{!isLoading && data?.length === 0 && (
					<EmptyState primary={t?.usersEmptyStateContainer} />
				)}
				{!isLoading &&
					data?.length > 0 &&
					data?.map((doc) => (
						<UserActivityListItem activityId={doc?.id} key={doc?.id} />
					))}
			</List>
			{/* <Box py={2} display='flex' justifyContent='center'>
				<LoadingButton onClick={() => fetchMore()}>{t?.loadMore}</LoadingButton>
			</Box> */}
		</>
	);
}
