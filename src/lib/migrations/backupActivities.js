import { db } from "../../firebase";
const YEAR = 2020;

export default async function backupActivities() {
	const activities = await db
		.collection("activities")
		// .limit(10)
		.get()
		.then((v) => v.docs.map((d) => ({ id: d.id, ...d.data() })));

	console.log("Backing up to activites backup 2020");
	await Promise.all(
		activities.map((activity) =>
			db
				.collection(`activities-backup-${YEAR}`)
				.doc(activity?.id)
				.set(activity, { merge: true })
		)
	);
	console.log("Done!");
	console.log(activities);
}
