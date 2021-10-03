export default function getUserPermissions(user) {
	switch (user?.role) {
		case "pending":
			return 0;
		case "user":
			return 1;
		case "manager":
			return 2;
		case "moderator":
			return 3;
		case "admin":
			return 4;
		default:
			return 0;
	}
}
