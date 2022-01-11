import { useState, createContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import useToggle from "../hooks/general/useToggle";
import qs from "query-string";
import getActivities from "../lib/API/queries/getActivities";

export const AdminActivitiesContext = createContext();

export const AdminActivitiesProvider = ({ children }) => {
	const queryClient = useQueryClient();
  // const [hasMoreResults, setHasMoreResults] = useState(false)
	const [lastResult, setLastResult] = useState(null);
	const [isOpen, toggleOpen] = useToggle();
	const { replace, pathname, location } = useHistory();
	const query = qs.parse(location.search);
	const hookRef = useQuery(["activities", query], async () => {
		const res = await getActivities(query, lastResult);
		setLastResult(res?.lastResult);
		const oldData = queryClient.getQueryData(["activities", query]);
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
		<AdminActivitiesContext.Provider
			value={{
				isOpen,
				toggleOpen,
				query,
				updateQuery,
				...hookRef,
			}}
		>
			{children}
		</AdminActivitiesContext.Provider>
	);
};
