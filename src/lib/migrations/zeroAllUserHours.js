import { db } from "../../firebase";

export default async function zeroAllUserHours() {
	console.log("running on all users");
	const users = await db
		.collection("users")
		.limit()
		.get()
		.then((s) => s.docs.map((d) => ({ id: d.id, ...d.data() })));

	await Promise.all(
		users?.map(async (user) => {
			await db.collection("users").doc(user?.id).update({
				"activities.pending": 0,
				"activities.approved": 0,
			});
		})
	);

  console.log('Done!')
}
