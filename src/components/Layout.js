import {
	Avatar,
	Button,
	Container,
	Divider,
	ListItemIcon,
	Menu,
	MenuItem,
	useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useSignOutMutation from "../hooks/auth/useSignOutMutation";
import useAnchorEl from "../hooks/general/useAnchorEl";
import useI18nContext from "../hooks/general/useI18nContext";
import { MdMenu } from "react-icons/md";
import { routes } from "../navigation/";
import getUserPermissions from "../lib/helpers/getUserPermissions";

export default function Layout({ children }) {
	const { data } = useCurrentUserQuery();
	const { zIndex, palette } = useTheme();
	const { mutateAsync: signOut } = useSignOutMutation();
	const [elementProps, triggerProps] = useAnchorEl();
	const { t } = useI18nContext();

	return (
		<>
			<Menu dir='rtl' {...elementProps}>
				{routes?.map(
					({ isMenuOption, label, exact, path, icon: Icon, minRole }) => {
						const isVisible =
							minRole <= getUserPermissions(data) && isMenuOption;

						return !isVisible ? null : (
							<NavLink
								activeStyle={{ color: palette.primary.main }}
								exact={exact}
								to={path}
								key={path}
							>
								<MenuItem onClick={elementProps.onClose}>
									<ListItemIcon style={{ minWidth: 32 }}>
										<Icon color='inherit' />
									</ListItemIcon>
									{t?.[label]}
								</MenuItem>
							</NavLink>
						);
					}
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
        zIndex={zIndex.appBar}
			>
				<Button
					variant='outlined'
					color='inherit'
					{...triggerProps}
					sx={{
						borderRadius: 32,
						paddingX: 0.5,
						borderColor: palette.divider,
						backgroundColor: palette.background.paper,
					}}
				>
					<Avatar src={data?.avatar} sx={{ height: 32, width: 32 }} />
					<Box component='span' lineHeight={0} mx={1}>
						<MdMenu size={24} />
					</Box>
				</Button>
			</Box>
			<Container maxWidth='sm'>{children}</Container>
		</>
	);
}
