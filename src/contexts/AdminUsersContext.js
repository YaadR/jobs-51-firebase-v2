import { useState, createContext } from "react";

export const AdminUsersContext = createContext();

export const AdminUsersProvider = ({ children }) => {
	const [query, setQuery] = useState({});
	const updateQuery = (updater) => {
    console.log(updater)
    setQuery((o) => ({ ...o, ...updater }))

  };

	return (
		<AdminUsersContext.Provider
			value={{
				query,
				updateQuery,
				setQuery,
			}}
		>
			{children}
		</AdminUsersContext.Provider>
	);
};
