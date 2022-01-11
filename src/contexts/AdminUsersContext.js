import { useState, createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import useToggle from "../hooks/general/useToggle";
import qs from "query-string";
import getUsers from "../lib/API/queries/getUsers";

export const AdminUsersContext = createContext();

export const AdminUsersProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [lastResult, setLastResult] = useState(null); 
	const [isOpen, toggleOpen] = useToggle();
	const { replace, pathname, location } = useHistory();
	const query = qs.parse(location.search);

	// @Y- hookRef for user data implementation is needed -
	// AdminActivitiesProvider under AdminActivitiesContext for example
	
		const hookRef = useQuery(["users", query], async () => {
		const res = await getUsers(query, lastResult);
		setLastResult(res?.lastResult);
		const oldData = queryClient.getQueryData(["users", query]);
		const data = Array.isArray(oldData) ? [...oldData, ...res.data] : res.data;

		data?.forEach((a) => queryClient.setQueryData(["user-activity", a?.id], a));
		return data;
	});
	
	const updateQuery = (updater) => {
		replace({
			pathname,
			search: qs.stringify({ ...updater }),
		});
	};

	return (
		<AdminUsersContext.Provider
			value={{
				isOpen,
				toggleOpen,
				query,
				updateQuery,
				...hookRef,
			}}
		>
			{children}
		</AdminUsersContext.Provider>
	);
};
