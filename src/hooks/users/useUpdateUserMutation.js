import { useMutation } from "react-query";
import { Users } from "../../lib/API/models";

export default function useUpdateUserMutation(userId, options) {
	return useMutation((v) => Users.doc(userId).update(v), options);
}
