import { LoadingButton } from "@mui/lab";
import {
	Alert,
	Avatar,
	Button,
	Link,
	Skeleton,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import constants from "../constants";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import useToggle from "../hooks/general/useToggle";
import useUpdateUserMutation from "../hooks/users/useUpdateUserMutation";
import useUserQuery from "../hooks/users/useUserQuery";

import getUserHeaderSecondaryText from "../lib/helpers/getUserHeaderSecondaryText";
import getUserPermissions from "../lib/helpers/getUserPermissions";
import BackButton from "./BackButton";
import Dialog from "./Dialog";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";
import UserForm from "./UserForm";

export default function UserHeader({ uid, backButton = false }) {
	const { t } = useI18nContext();
	const { data: user, refetch } = useUserQuery(uid);
	const { data: currentUser } = useCurrentUserQuery();
	const [isEditing, toggleEditing] = useToggle(false);
	const { mutateAsync, isLoading } = useUpdateUserMutation(uid, {
		onSuccess: refetch,
	});

	const isCurrentUserOrAdmin = uid === currentUser?.uid;

	return (
		<>
			{backButton && <BackButton />}
			{user?.role === "pending" && getUserPermissions(currentUser) >= 2 && (
				<Alert
					sx={{ mb: 2, mt: 2 }}
					severity='warning'
					action={
						<>
							<LoadingButton
								loading={isLoading}
								disabled={isLoading}
								color='inherit'
								size='small'
								onClick={() => mutateAsync({ role: constants.ROLES.USER })}
							>
								{t?.approve}
							</LoadingButton>
							{/* <LoadingButton
								disabled={isLoading}
								color='error'
								size='small'
								onClick={toggleDeleting}
							>
								{t?.deleteUser}
							</LoadingButton> */}
						</>
					}
				>
					{user?.displayName} {t?.pending}
				</Alert>
			)}
			<Box display='flex' alignItems='center' justifyContent='space-between'>
				<Box>
					<PrimaryAndSecondaryTypography
						primaryProps={{ variant: "h4", gutterBottom: true }}
						primary={
							!!user ? (
								<Box component='span' display='flex' alignItems='center'>
									{user?.displayName}
									{isCurrentUserOrAdmin && (
										<>
											<Box sx={{ mx: 1 }}>•</Box>
											<Link onClick={toggleEditing}>{t?.editProfile}</Link>
										</>
									)}
								</Box>
							) : (
								<Skeleton variant='text' width={80} />
							)
						}
						secondary={
							!!user ? (
								getUserHeaderSecondaryText(user, t)
							) : (
								<Skeleton variant='text' width={200} />
							)
						}
					/>
				</Box>
				{!!user ? (
					<Avatar
						src={user?.avatar}
						alt={`${user?.firstName} ${user?.lastName}`}
					/>
				) : (
					<Skeleton variant='circular' height={40} width={40} />
				)}
			</Box>
			<Dialog
				maxWidth='sm'
				fullWidth
				open={isEditing}
				onClose={toggleEditing}
				title={t?.editProfile}
			>
				<UserForm
					defaultValues={user}
					isLoading={isLoading}
					onSubmit={(v) => {
						mutateAsync(v).then(() => toggleEditing());
					}}
					onCancel={toggleEditing}
				/>
			</Dialog>
		</>
	);
}
