import Activity from "../components/Activity";
import Admin from "../components/admin/Admin";
import Settings from "../components/Settings";
import User from "../components/User";
import { BsLightningChargeFill } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { FaCog, FaBell } from "react-icons/fa";
import AdminManageActivities from "../components/admin/AdminManageActivities";
import AdminManageUsers from "../components/admin/AdminManageUsers";
import Notifications from "../components/Notifications";

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
	{
		component: Notifications,
		path: "/notifications",
		label: "notifications",
		minRole: 1,
		isMenuOption: true,
		icon: FaBell,
	},
];
