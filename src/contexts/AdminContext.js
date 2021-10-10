import { useState, createContext } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
	const [usersQuery, setUsersQuery] = useState({});
	const [activitiesQuery, setActivitiesQuery] = useState({});

	const updateUsersQuery = (updater) =>
		setUsersQuery((old) => ({ ...old, updater }));

	const updateActivitiesQuery = (updater) =>
		setActivitiesQuery((old) => ({ ...old, updater }));

	return (
		<AdminContext.Provider
			value={{
				usersQuery,
				activitiesQuery,
				updateUsersQuery,
				updateActivitiesQuery,
			}}
		>
			{children}
		</AdminContext.Provider>
	);
};
