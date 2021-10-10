import Activity from "../components/Activity";
import Admin from "../components/Admin";
import Settings from "../components/Settings";
import User from "../components/User";
import { BsLightningChargeFill } from "react-icons/bs";
import { FaCog } from "react-icons/fa";

export const routes = [
	{
		component: Activity,
		path: "/",
		exact: true,
		minRole: 1,
		label: "activity",
		isMenuOption: true,
		icon: <BsLightningChargeFill />,
	},
	{
		component: User,
		path: "/u/:uid",
		minRole: 1,
	},
	{
		component: Settings,
		path: "/settings",
		exact: true,
		minRole: 1,
		label: "settings",
		isMenuOption: true,
		icon: <FaCog />,
	},
	{
		component: Admin,
		path: "/admin",
		exact: true,
		minRole: 3,
		label: "adminPage",
		isMenuOption: true,
	},
];
