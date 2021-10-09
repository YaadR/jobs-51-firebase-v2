import { Fab } from "@mui/material";
import useI18nContext from "../hooks/general/useI18nContext";
import useToggle from "../hooks/general/useToggle";
import Dialog from "./Dialog";
import ActivityForm from "./ActivityForm";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useCreateActivityMutation from "../hooks/activity/useCreateActivityMutation";
import { useQueryClient } from "react-query";
import constants from "../constants";
import { AiOutlinePlus } from "react-icons/ai";

export default function CreateActivity() {
	const queryClient = useQueryClient();
	const { data: currentUser } = useCurrentUserQuery();
	const [isOpen, toggleOpen] = useToggle(false);
	const { t } = useI18nContext();
	const { mutateAsync, isLoading } = useCreateActivityMutation({
		onSuccess: () => {
			queryClient.invalidateQueries(["user-activities", currentUser?.id]);
			toggleOpen();
		},
	});

	return (
		<>
			<Fab
				onClick={toggleOpen}
				color='primary'
				sx={{ position: "fixed", bottom: 24 }}
			>
				<AiOutlinePlus size={24} />
			</Fab>
			<Dialog
				dir='rtl'
				maxWidth='sm'
				fullWidth
				open={isOpen}
				onClose={toggleOpen}
				title={t?.addActivity}
			>
				<ActivityForm
					defaultValues={{
						uid: currentUser?.id,
						type: constants.ACTIVITY_TYPES[0],
						user: {
							avatar: currentUser?.avatar,
							firstName: currentUser?.firstName,
							lastName: currentUser?.lastName,
							region: currentUser?.region,
						},
					}}
					onCancel={toggleOpen}
					onSubmit={mutateAsync}
          isLoading={isLoading}
				/>
			</Dialog>
		</>
	);
}
