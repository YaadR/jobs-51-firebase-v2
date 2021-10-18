import {
	Avatar,
	ListItemText,
	List,
	ListItem,
	ListItemAvatar,
	Typography,
} from "@mui/material";
import { format } from "date-fns";
import useI18nContext from "../hooks/general/useI18nContext";
import useNotificationsQuery from "../hooks/notifications/useNotificationsQuery";
import getNotificationText from "../lib/helpers/getNotificationText";
import NotificationListItem from "./NotificationListItem";

export default function Notifications() {
	const { t } = useI18nContext();
	const { data } = useNotificationsQuery();

	return (
		<>
			<Typography variant='h1'>{t?.notifications}</Typography>
			<List>
				{data?.map((notification) => (
					<NotificationListItem
						key={notification.id}
						notificationId={notification?.id}
					/>
				))}
			</List>
		</>
	);
}
