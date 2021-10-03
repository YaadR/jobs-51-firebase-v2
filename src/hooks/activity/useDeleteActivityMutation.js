import { useMutation } from "react-query";
import { db } from "../../firebase";
import { Activity } from "../../lib/API/models";

export default function useDeleteActivityMutation(activityId, options) {
	return useMutation(() => Activity.doc(activityId).delete(), options);
}
