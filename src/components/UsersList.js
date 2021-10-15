import { Box, CircularProgress, List } from "@mui/material";
import useI18nContext from "../hooks/general/useI18nContext";
import useUsersQuery from "../hooks/users/useUsersQuery";
import EmptyState from "./EmptyState";
import UserListItem from "./UserListItem";

export default function UsersList({ query }) {
	const { data, isLoading } = useUsersQuery(query);
	const { t } = useI18nContext();
	const isEmpty = !isLoading && data?.length === 0;

	return (
		<>
			<List>
				{isLoading && (
					<Box display='flex' justifyContent='center' py={4}>
						<CircularProgress size={24} />
					</Box>
				)}
				{isEmpty && <EmptyState primary={t?.usersEmptyStateContainer} />}
				{!!data &&
					data?.map((user) => (
						<UserListItem userId={user?.id} key={user?.id} />
					))}
			</List>
		</>
	);
}
