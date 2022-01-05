import { Users } from "../models";
import t from "../../translations/he";

// @Y- this block is copied from getActivities as is. yet to be adjusted
export default async function getUsers(query, lastResult) {
	let queryRef = Users.orderBy("dateCreated", "desc");

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
