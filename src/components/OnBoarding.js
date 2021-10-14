import { Container } from "@mui/material";
import { useForm } from "react-hook-form";
import constants from "../constants";
import useUpdateCurrentUserMutation from "../hooks/auth/useUpdateCurrentUserMutation";
import useI18nContext from "../hooks/general/useI18nContext";
import Form from "./form/Form";
import FormSelectField from "./form/FormSelectField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTextField from "./form/FormTextField";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";

const schema = yup
	.object({
		region: yup.string().required("This field is required"),
		displayName: yup.string().required("This field is required"),
	})
	.required();

export default function OnBoarding() {
	const { data: user, refetch } = useCurrentUserQuery();
	const { handleSubmit, control } = useForm({
		defaultValues: {
      displayName: user?.displayName,
      region: user?.region ?? constants.REGIONS?.[0]
    },
		resolver: yupResolver(schema),
	});
	const { t } = useI18nContext();
	const { mutateAsync, isLoading } = useUpdateCurrentUserMutation({
		onSuccess: refetch,
	});

	return (
		<Container maxWidth='sm'>
			<Form isLoading={isLoading} onSubmit={handleSubmit(mutateAsync)}>
				<FormTextField
					label={t?.fullName}
					name='displayName'
					control={control}
					fullWidth
				/>
				<FormSelectField
					label={t?.region}
					name='region'
					control={control}
					options={constants.REGIONS}
				/>
			</Form>
		</Container>
	);
}
