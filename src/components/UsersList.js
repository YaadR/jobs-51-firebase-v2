import {
	Avatar,
	Chip,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
} from "@mui/material";
import { useHistory } from "react-router";
import useI18nContext from "../hooks/general/useI18nContext";
import useUsersQuery from "../hooks/users/useUsersQuery";

export default function UsersList({ query }) {
	const { data } = useUsersQuery(query);
	const { t } = useI18nContext();
	const { push } = useHistory();

	return (
		<List>
			{data?.map((user) => (
				<ListItemButton onClick={() => push(`/u/${user?.id}`)}>
					<ListItemAvatar>
						<Avatar src={user?.avatar} alt={user?.displayName} />
					</ListItemAvatar>
					<ListItemText
						primary={user?.displayName}
						secondary={
							user?.region ? `${t?.region} ${user?.region}` : user?.email
						}
					/>
					<ListItemSecondaryAction>
						<Chip
							variant='outlined'
							color='primary'
							label={t?.roles?.[user?.role]}
						/>
					</ListItemSecondaryAction>
				</ListItemButton>
			))}
		</List>
	);
}
