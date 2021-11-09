import { useForm } from "react-hook-form";
import constants from "../constants";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useI18nContext from "../hooks/general/useI18nContext";
import getUserPermissions from "../lib/helpers/getUserPermissions";
import Form from "./form/Form";
import FormSelectField from "./form/FormSelectField";
import FormTextField from "./form/FormTextField";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import useToggle from "../hooks/general/useToggle";
import ApprovalDialog from "./ApprovalDialog";

export default function UserForm({
	defaultValues,
	onSubmit,
	isLoading,
	onCancel,
	onDelete,
}) {
	const { t } = useI18nContext();
	const schema = yup
		.object({
			displayName: yup.string().required(t?.formErrors?.descriptionError),
			region: yup.string().required(t?.formErrors?.descriptionError),
			phone: yup.string(),
		})
		.required();
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { data } = useCurrentUserQuery();
	const isCurrentUserAdmin = getUserPermissions(data);
	const [isDeleting, toggleDeleting] = useToggle(false);

	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				onCancel={onCancel}
				isLoading={isLoading}
			>
				<FormTextField
					fullWidth
					name='displayName'
					control={control}
					label={t?.fullName}
				/>
				<FormTextField
					fullWidth
					name='phone'
					control={control}
					label={t?.phone}
				/>
				<FormSelectField
					name='region'
					label={t?.region}
					disabled={!isCurrentUserAdmin}
					control={control}
					options={constants.REGIONS}
				/>
				{onDelete && (
					<Button onClick={toggleDeleting} color='error' variant='outlined'>
						{t?.deleteUser}
					</Button>
				)}
			</Form>
			<ApprovalDialog
				open={isDeleting}
				onClose={toggleDeleting}
        onApprove={onDelete}
				text={t?.areYouSure}
        primaryButtonProps={{color: 'error'}}
			/>
		</>
	);
}
