import {
	Avatar,
	Button,
	Container,
	Divider,
	Menu,
	MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import constants from "../constants";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useSignOutMutation from "../hooks/auth/useSignOutMutation";
import useAnchorEl from "../hooks/general/useAnchorEl";
import useI18nContext from "../hooks/general/useI18nContext";
import { MdMenu } from "react-icons/md";

export default function Layout({ children }) {
	const { data } = useCurrentUserQuery();
	const { mutateAsync: signOut } = useSignOutMutation();
	const [elementProps, triggerProps] = useAnchorEl();
	const { t } = useI18nContext();

	return (
		<>
			<Menu dir='rtl' {...elementProps}>
				<NavLink to='/'>
					<MenuItem>{t?.activity}</MenuItem>
				</NavLink>
				{[
					constants.ROLES.ADMIN,
					constants.ROLES.MODERATOR,
					constants.ROLES.MANAGER,
				]?.includes(data?.role) && (
					<NavLink to='/admin'>
						<MenuItem>{t?.adminPage}</MenuItem>
					</NavLink>
				)}
				<Divider />
				<MenuItem onClick={signOut}>{t?.signOut}</MenuItem>
			</Menu>
			<Box
				px={2}
				py={1}
				display='flex'
				justifyContent='flex-end'
				position='sticky'
				top={0}
			>
				<Button
					variant='outlined'
          color='inherit'
					{...triggerProps}
					sx={{ borderRadius: 32, paddingX: .5 }}
				>
					<Avatar
						src={data?.avatar}
						sx={{ height: 32, width: 32,  }}
					/>
					<Box component='span' lineHeight={0} mx={1}>
						<MdMenu size={24} />
					</Box>
				</Button>
			</Box>
			<Container maxWidth='md'>{children}</Container>
		</>
	);
}
