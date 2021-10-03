import { useMutation } from "react-query";
import { Users } from "../../lib/API/models";
import useCurrentUserQuery from "./useCurrentUserQuery";

export default function useUpdateCurrentUserMutation(options) {
	const { data: currentUser } = useCurrentUserQuery();

	return useMutation((v) => Users.doc(currentUser?.id).update(v), options);
}
