export default function getUserHeaderSecondaryText(user, t) {
	if (user?.region) {
		return `${t?.activeVolunteer} ${t?.inRegion} ${user?.region}`;
	} else if (user?.email) {
		return user?.email;
	} else {
		return "";
	}
}
