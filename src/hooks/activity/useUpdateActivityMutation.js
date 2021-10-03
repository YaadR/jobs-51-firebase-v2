import { useMutation } from "react-query";
import { Activity } from "../../lib/API/models";

export default function useUpdateActivityMutation(activityId, options) {
	return useMutation((v) => Activity.doc(activityId).update(v), options);
}
