import { format } from "date-fns";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	Avatar,
	Divider,
	ListItem,
	ListItemAvatar,
	Collapse,
	ListItemText,
	Typography,
	ListItemSecondaryAction,
	Chip,
	Skeleton,
} from "@mui/material";
import { Box } from "@mui/system";
import { useQueryClient } from "react-query";
import useActivityQuery from "../hooks/activity/useActivityQuery";
import useDeleteActivityMutation from "../hooks/activity/useDeleteActivityMutation";
import useUpdateActivityMutation from "../hooks/activity/useUpdateActivityMutation";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import useToggle from "../hooks/general/useToggle";
import useUserQuery from "../hooks/users/useUserQuery";
import getUserPermissions from "../lib/helpers/getUserPermissions";
import ApprovalDialog from "./ApprovalDialog";
import { useHistory } from "react-router";

export default function UserActivityListItem({ activityId }) {
	const queryClient = useQueryClient();
	const { push } = useHistory();
	const { data: activity, isLoadingActivity } = useActivityQuery(activityId);
	const { data: user, isLoadingUser } = useUserQuery(activity?.uid);
	const [isOpen, toggleOpen] = useToggle(false);
	const { t } = useI18nContext();
	const { data: currentUser } = useCurrentUserQuery();
	const [isDeleting, toggleDeleting] = useToggle(false);
	const refetchActivities = () =>
		queryClient.invalidateQueries(["user-activities", user?.id]);
	const { mutateAsync: updateAcitivtyAsync, isLoading: isApprovingAsync } =
		useUpdateActivityMutation(activityId, {
			onSuccess: () => refetchActivities(),
		});
	const { mutateAsync: deleteActivityAsync, isLoading: isDeletingAsync } =
		useDeleteActivityMutation(activityId, {
			onSuccess: () => {
				refetchActivities();
				toggleDeleting();
			},
		});
	const isApproved = activity?.approved;
	const activityDate = activity?.dateCreated
		? format(new Date(activity?.dateCreated), "dd/MM/yyyy")
		: null;
	const isLoading = isLoadingUser || isLoadingActivity || !user || !activity;

	return (
		<>
			<ListItem onClick={toggleOpen} button alignItems='flex-start'>
				<ListItemAvatar>
					{isLoading ? (
						<Skeleton variant='circular' height={40} width={40} />
					) : (
						<Avatar
							onClick={() => push(`/u/${user?.id}`)}
							src={user?.avatar}
							alt={user?.displayName}
						/>
					)}
				</ListItemAvatar>
				<ListItemText
					primaryTypographyProps={{ noWrap: true }}
					primary={
						isLoading ? (
							<Skeleton variant='text' height={24} width={80} />
						) : (
							`${user?.displayName} • ${activityDate}`
						)
					}
					secondaryTypographyProps={{ noWrap: !isOpen }}
					secondary={
						isLoading ? (
							<Skeleton variant='text' height={24} width={120} />
						) : (
							<>
								{activity?.total} {t?.hours}, {activity?.type} <br />
								{activity?.description}
							</>
						)
					}
				/>
				{!isLoading && (
					<Chip
						sx={{ mt: 1 }}
						variant='outlined'
						color={isApproved ? "primary" : "default"}
						size='small'
						label={isApproved ? t?.approved : t?.pending}
					/>
				)}
			</ListItem>
			{getUserPermissions(currentUser) >= 1 && (
				<Collapse in={isOpen}>
					<Box
						py={1}
						px={3}
						justifyContent='center'
						display='flex'
						alignItems='center'
					>
						{!isApproved && getUserPermissions(currentUser) >= 2 && (
							<LoadingButton
								loading={isApprovingAsync}
								onClick={() =>
									updateAcitivtyAsync({
										approved: true,
										approvedBy: {
											avatar: currentUser?.avatar,
											firstName: currentUser?.firstName,
											lastName: currentUser?.lastName,
											uid: currentUser?.id,
										},
									})
								}
								sx={{ mx: 2 }}
							>
								{t?.approve}
							</LoadingButton>
						)}
						<LoadingButton
							loading={isDeletingAsync}
							color='error'
							onClick={toggleDeleting}
						>
							{t?.deleteActivity}
						</LoadingButton>
					</Box>
				</Collapse>
			)}
			<Divider />
			<ApprovalDialog
				maxWidth='xs'
				fullWidth
				open={isDeleting}
				onClose={toggleDeleting}
				text={t?.areYouSure}
				onApprove={deleteActivityAsync}
				isLoading={isDeletingAsync}
				primaryButtonProps={{
					color: "error",
				}}
			/>
		</>
	);
}
