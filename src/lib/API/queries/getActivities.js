import { Activity } from "../models";
import t from "../../translations/he";

export default async function getActivities(query, lastResult) {
	let queryRef = Activity.orderBy("dateCreated", "desc");

	if (query?.status === "pending") {
		queryRef = queryRef.where("approved", "==", false);
	}

	if (query?.status === "approved") {
		queryRef = queryRef.where("approved", "==", true);
	}

	if (!!query?.region && query?.region !== t?.all) {
		queryRef = queryRef.where("region", "==", query?.region);
	}

	if (lastResult) {
		queryRef = queryRef.startAfter(lastResult);
	}

	return queryRef
		.limit(10)
		.get()
		.then((s) => ({
			lastResult: s.docs?.[s.docs.length - 1],
			data: s.docs.map((d) => ({ id: d.id, ...d.data() })),
		}));
}
