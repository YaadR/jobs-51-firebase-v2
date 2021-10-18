import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { formatDistance } from "date-fns";
import { useEffect } from "react";
import useI18nContext from "../hooks/general/useI18nContext";
import useNotificationQuery from "../hooks/notifications/useNotificationQuery";
import useUpdateNotificationMutation from "../hooks/notifications/useUpdateNotificationMutation";
import getNotificationText from "../lib/helpers/getNotificationText";
import { he } from "date-fns/locale";

const TIMEOUT = 30000;

export default function NotificationListItem({ notificationId }) {
	const { data } = useNotificationQuery(notificationId);
	const { mutate } = useUpdateNotificationMutation(notificationId);
	const { t } = useI18nContext();

	// useEffect(() => {
	// 	const clearNotification = async () => {
	// 		setTimeout(mutate({ seen: true }), TIMEOUT);
	// 	};

	// 	clearNotification();
	// }, []);

	return (
		<ListItem divider>
			<ListItemAvatar>
				<Avatar
					src={data?.notificationBy?.avatar}
					alt={data?.notificationBy?.displayName}
				/>
			</ListItemAvatar>
			<ListItemText
				secondary={formatDistance(
					new Date(data?.dateCreated),
					new Date(Date.now()),
					{ locale: he, addSuffix: true }
				)}
				primary={getNotificationText(data, t)}
			/>
		</ListItem>
	);
}
