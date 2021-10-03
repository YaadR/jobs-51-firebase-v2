import { useQuery } from "react-query";
import { useParams } from "react-router";
import useUserQuery from "../hooks/users/useUserQuery";
import UserActivitiesList from "./UserActivitiesList";

export default function User() {
	const { uid } = useParams();
	const { data } = useUserQuery(uid);

	return (
		<>
			<h1>USER</h1>
			<pre>{JSON.stringify(data, null, 2)}</pre>
			<h1>Activity</h1>
			<UserActivitiesList uid={uid} />
		</>
	);
}
