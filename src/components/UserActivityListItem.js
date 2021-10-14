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

export default function UserActivityListItem({ activityId }) {
	const queryClient = useQueryClient();
	const { data: activity } = useActivityQuery(activityId);
	const { data: user } = useUserQuery(activity?.uid);
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

	return (
		<>
			<ListItem
				onClick={toggleOpen}
				button
				alignItems='flex-start'
				secondaryAction={
					<Chip
						variant='outlined'
						color={isApproved ? "primary" : "default"}
						size='small'
						label={isApproved ? t?.approved : t?.pending}
					/>
				}
			>
				<ListItemAvatar>
					<Avatar src={user?.avatar} />
				</ListItemAvatar>
				<ListItemText
					disableTypography
					primary={
						<Typography variant='body1'>
							{user?.firstName} {user?.lastName} •{" "}
							{format(new Date(activity?.dateCreated), "dd/mm/yyyy")}
						</Typography>
					}
					secondary={
						<>
							<Typography variant='body1' color='text.secondary'>
								{activity?.total} {t?.hours}, {activity?.type} <br />
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{activity?.description}
							</Typography>
						</>
					}
				/>
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
