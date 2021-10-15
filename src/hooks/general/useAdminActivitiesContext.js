import { useContext } from "react";
import { AdminActivitiesContext } from "../../contexts/AdminActivitiesContext";

export default function useAdminActivitiesContext() {
	return useContext(AdminActivitiesContext);
}
