import { useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import useToggle from "../hooks/general/useToggle";
import qs from "query-string";

export const AdminUsersContext = createContext();

export const AdminUsersProvider = ({ children }) => {
	const [isOpen, toggleOpen] = useToggle();
	const { replace, pathname, location } = useHistory();
	const query = qs.parse(location.search);

	console.log(location.search);
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
			}}
		>
			{children}
		</AdminUsersContext.Provider>
	);
};
