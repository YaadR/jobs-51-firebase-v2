import { useMutation } from "react-query";
import { Users } from "../../lib/API/models";

export default function useDeleteUserMutation(userId, options) {
	return useMutation(() => Users.doc(userId).delete(), options);
}
