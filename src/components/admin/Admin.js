import {
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import useI18nContext from "../../hooks/general/useI18nContext";
import PrimaryAndSecondaryTypography from "../PrimaryAndSecondaryTypography";
import { BsPeopleFill, BsLightningChargeFill } from "react-icons/bs";
import { useHistory } from "react-router";

export default function Admin() {
	const { t } = useI18nContext();
	const { push } = useHistory();

	return (
		<>
			<PrimaryAndSecondaryTypography
				primaryProps={{ variant: "h2", gutterBottom: true }}
				primary={t?.adminPage}
			/>
			<List>
				<ListItemButton onClick={() => push("/admin/users")}>
					<ListItemIcon>
						<BsPeopleFill />
					</ListItemIcon>
					<ListItemText primary={t?.manageUsers} />
				</ListItemButton>
				<ListItemButton onClick={() => push("/admin/activities")}>
					<ListItemIcon>
						<BsLightningChargeFill />
					</ListItemIcon>
					<ListItemText primary={t?.manageActivities} />
				</ListItemButton>
			</List>
		</>
	);
}
