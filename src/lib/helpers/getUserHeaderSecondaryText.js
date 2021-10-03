

export default function getUserHeaderSecondaryText(user, t) {
	if (user?.region) {
		return `${t?.activeVolunteer} ${
			user?.region ? `${t?.inRegion} ${user?.region}` : ""
		}`;
	} else if (user?.serviceYear) {
		return `${t?.joined} ${user?.serviceYear}`;
	} else if (user?.email) {
		return user?.email;
	} else {
		return "";
	}
}
