import { useQuery } from "react-query";
import { db } from "../../firebase";

export default function useUserQuery(uid) {
	return useQuery(["user", uid], async () => {
		return db
			.collection("users")
			.doc(uid)
			.get()
			.then((d) => ({ id: d.id, ...d.data() }));
	});
}
