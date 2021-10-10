import { useState, createContext } from "react";

export const AdminActivitiesContext = createContext();

export const AdminActivitiesProvider = ({ children }) => {
	const [query, setQuery] = useState({});
	const updateQuery = (updater) => setQuery((o) => ({ ...o, ...updater }));

	return (
		<AdminActivitiesContext.Provider
			value={{
				query,
				updateQuery,
				setQuery,
			}}
		>
			{children}
		</AdminActivitiesContext.Provider>
	);
};
