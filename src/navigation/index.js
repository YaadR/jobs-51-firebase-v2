import Activity from "../components/Activity";
import Admin from "../components/Admin";
import Settings from "../components/Settings";
import User from "../components/User";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";
import { ImStatsBars } from "react-icons/im";
import AdminManageActivities from "../components/AdminManageActivities";
import AdminManageUsers from "../components/AdminManageUsers";

export const routes = [
	{
		component: Activity,
		path: "/",
		exact: true,
		minRole: 1,
		label: "activity",
		isMenuOption: true,
		icon: BsLightningChargeFill,
	},
	{
		component: Settings,
		path: "/settings",
		exact: true,
		minRole: 1,
		label: "settings",
		isMenuOption: true,
		icon: FaCog,
	},
	{
		component: Admin,
		path: "/admin",
		exact: true,
		minRole: 3,
		label: "adminPage",
		isMenuOption: true,
		icon: ImStatsBars,
	},
	{
		component: AdminManageUsers,
		path: "/admin/users",
		exact: true,
		minRole: 3,
		label: "manageUsers",
		icon: ImStatsBars,
	},
	{
		component: AdminManageActivities,
		path: "/admin/activities",
		exact: true,
		minRole: 3,
		label: "manageActivities",
		icon: ImStatsBars,
	},
	{
		component: User,
		path: "/u/:uid",
		minRole: 1,
	},
];
