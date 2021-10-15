import { db } from "../../firebase";

export default async function changeUsersToDisplayName() {
	const users = await db
		.collection("users")
		// .limit(10)
		.get()
		.then((v) => v.docs.map((d) => ({ id: d.id, ...d.data() })));

	console.log("Changind users names");
	await Promise.all(
		users.map((user) => {
			const displayName = `${user?.firstName} ${user?.lastName}`;
			console.log(displayName);
			return db.collection(`users`).doc(user?.id).update({ displayName });
		})
	);
	console.log("Done!");
}
