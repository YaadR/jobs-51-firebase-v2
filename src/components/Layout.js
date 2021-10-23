import {
	Badge,
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
import useNotificationsQuery from "../hooks/notifications/useNotificationsQuery";
import { MdMenu } from "react-icons/md";
import { routes } from "../navigation/";
import getUserPermissions from "../lib/helpers/getUserPermissions";

export default function Layout({ children }) {
	const { data } = useCurrentUserQuery();
	const { zIndex, palette, spacing } = useTheme();
	const { mutateAsync: signOut } = useSignOutMutation();
	const [elementProps, triggerProps] = useAnchorEl();
	const { t } = useI18nContext();
	const { data: notifications } = useNotificationsQuery();
	const hasUnreadNotifications = notifications?.find((v) => !v?.seen);

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
								<MenuItem sx={{ my: 1 }} onClick={elementProps.onClose}>
									<ListItemIcon>
										<Badge
											color='error'
											variant='dot'
											dir='ltr'
											invisible={
												!hasUnreadNotifications || label !== "notifications"
											}
										>
											<Icon size={16} color='inherit' />
										</Badge>
									</ListItemIcon>
									{t?.[label]}
								</MenuItem>
							</NavLink>
						);
					}
				)}

				<Divider />
				<MenuItem sx={{ my: 1 }} onClick={signOut}>
					{t?.signOut}
				</MenuItem>
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
					<Badge
						color='error'
						variant='dot'
						dir='ltr'
						invisible={!hasUnreadNotifications}
					>
						<Avatar src={data?.avatar} sx={{ height: 32, width: 32 }} />
					</Badge>
					<Box component='span' lineHeight={0} mx={1}>
						<MdMenu size={24} />
					</Box>
				</Button>
			</Box>
			<Container maxWidth='sm'>{children}</Container>
		</>
	);
}
