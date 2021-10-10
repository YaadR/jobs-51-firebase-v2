import { useContext } from "react";
import { AdminUsersContext } from "../../contexts/AdminUsersContext";

export default function useAdminUsersContext() {
	return useContext(AdminUsersContext);
}
