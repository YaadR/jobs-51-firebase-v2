import { format } from "date-fns";
import { he } from "date-fns/locale";

export default function getNotificationText(notification, t) {
	switch (notification?.type) {
		case "activityApproved": {
			return `${getNotificationByName(notification, t)} ${
				t?.approvedTheActivity
			}  ${t?.fromDate} ${format(notification?.dateCreated, "dd/MM/yyyy", {
				locale: he,
			})}`;
		}
		default:
			return "";
	}
}

const getNotificationByName = (notification, t) => {
	const { notificationBy } = notification;
	if (notificationBy?.displayName) return notificationBy?.displayName;
	if (notificationBy?.firstName)
		return `${notificationBy?.firstName} ${notificationBy?.lastName}`;

	return t?.manager;
};
