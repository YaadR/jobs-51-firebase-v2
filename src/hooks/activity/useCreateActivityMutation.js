import { useMutation } from "react-query";
import { Activity } from "../../lib/API/models";

export default function useCreateActivityMutation(options) {
	return useMutation(
		(v) =>
			Activity.add({
				...v,
				dateCreated: Date.now(),
			}),
		options
	);
}
