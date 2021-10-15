import { useState, createContext } from "react";
import useToggle from "../hooks/general/useToggle";

export const AdminUsersContext = createContext();

export const AdminUsersProvider = ({ children }) => {
	const [isOpen, toggleOpen] = useToggle();
	const [query, setQuery] = useState({});

	const updateQuery = (updater) => {
		setQuery((o) => ({ ...o, ...updater }));
	};

	return (
		<AdminUsersContext.Provider
			value={{
				isOpen,
				toggleOpen,
				query,
				updateQuery,
				setQuery,
			}}
		>
			{children}
		</AdminUsersContext.Provider>
	);
};
