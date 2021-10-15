import {
	Avatar,
	Chip,
	ListItemAvatar,
	ListItemButton,
	ListItemSecondaryAction,
	ListItemText,
} from "@mui/material";
import { useHistory } from "react-router";
import useI18nContext from "../hooks/general/useI18nContext";
import useUserQuery from "../hooks/users/useUserQuery";

export default function UserListItem({ userId }) {
	const { push } = useHistory();
	const { t } = useI18nContext();
	const { data: user } = useUserQuery(userId);

	return (
		<ListItemButton divider onClick={() => push(`/u/${user?.id}`)}>
			<ListItemAvatar>
				<Avatar src={user?.avatar} alt={user?.displayName} />
			</ListItemAvatar>
			<ListItemText
				primary={user?.displayName}
				secondary={user?.region ? `${t?.region} ${user?.region}` : user?.email}
			/>
			<ListItemSecondaryAction>
				<Chip
					size='small'
					variant='outlined'
					color='primary'
					label={t?.roles?.[user?.role]}
				/>
			</ListItemSecondaryAction>
		</ListItemButton>
	);
}
