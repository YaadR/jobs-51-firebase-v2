import { Activity } from "../../lib/API/models";
import getUserActivityStats from "./getUserActivityStats";

export default async function getUsersCSV(users, t) {
	let dataArr = [];
	// map it to displayName, region, role, pendingHours, approvedHours
	await Promise.all(
		users?.map(async (user) => {
			const totalUserActivities = await Activity.where("uid", "==", user?.id)
				.get()
				.then((s) => s.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

			const [approved, pending] = getUserActivityStats(totalUserActivities);
			return [
				user?.displayName,
				user?.region,
				pending?.value,
				approved?.value,
			];
		})
	).then((v) => dataArr.push(...v));


	return [
		[
			t?.username,
			t?.region,
			t?.pending,
			t?.approved,
		],
		...dataArr,
	];
}

