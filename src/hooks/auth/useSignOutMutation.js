import { useMutation, useQueryClient } from "react-query";
import { auth } from "../../firebase";

export default function useSignOutMutation() {
	const queryClient = useQueryClient();
	return useMutation(() =>
		auth.signOut().then(() => {
			queryClient.clear();
			return window.location.reload();
		})
	);
}
