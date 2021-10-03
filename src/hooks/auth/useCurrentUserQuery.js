import { useQuery } from "react-query";
import { fetchOrCreateUser } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

export default function useCurrentUserQuery(options) {
	return useQuery(
		"current-user",
		() => fetchOrCreateUser(auth.currentUser),
		options
	);
}
