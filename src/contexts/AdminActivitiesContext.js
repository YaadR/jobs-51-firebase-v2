import { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import useToggle from "../hooks/general/useToggle";
import qs from "query-string";

export const AdminActivitiesContext = createContext();

export const AdminActivitiesProvider = ({ children }) => {
	const [isOpen, toggleOpen] = useToggle();
	const { replace, pathname, location } = useHistory();
	const query = qs.parse(location.search);

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
			}}
		>
			{children}
		</AdminActivitiesContext.Provider>
	);
};
