import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Skeleton,
} from "@mui/material";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import useUserQuery from "../hooks/users/useUserQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import { MdEmail, MdLocationCity, MdPhone } from "react-icons/md";

export default function UserDetails({ uid }) {
	const { data: user } = useUserQuery(uid);
	const { t } = useI18nContext();

	return (
		<>
			<PrimaryAndSecondaryTypography
				primary={
					!!user ? t?.personalInfo : <Skeleton variant='text' width={104} />
				}
				secondary={
					!!user ? (
						`${t?.personalInfoDescription} ${user?.displayName}`
					) : (
						<Skeleton variant='text' width={104} />
					)
				}
			/>
			<List>
				{!!user?.email && (
					<ListItem>
						<ListItemIcon>
							<MdEmail size={24} />
						</ListItemIcon>
						<ListItemText primary={user?.email} />
					</ListItem>
				)}
				{!!user?.phone && (
					<ListItem>
						<ListItemIcon>
							<MdPhone size={24} />
						</ListItemIcon>
						<ListItemText primary={user?.phone} />
					</ListItem>
				)}
				{!!user?.hometown && (
					<ListItem>
						<ListItemIcon>
							<MdLocationCity size={24} />
						</ListItemIcon>
						<ListItemText primary={user?.hometown} />
					</ListItem>
				)}
			</List>
		</>
	);
}
