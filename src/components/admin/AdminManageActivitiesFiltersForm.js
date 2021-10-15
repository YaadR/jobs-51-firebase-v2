import { Controller, useForm } from "react-hook-form";
import useI18nContext from "../../hooks/general/useI18nContext";
import Form from "../form/Form";
import Section from "../Section";
import useUsersQuery from "../../hooks/users/useUsersQuery";
import FormSelectField from "../form/FormSelectField";
import { Autocomplete, TextField } from "@mui/material";
import constants from "../../constants";

export default function AdminManageActivitiesFiltersForm({
	onCancel,
	onSubmit,
	defaultValues,
}) {
	const { handleSubmit, control } = useForm({
		defaultValues,
	});
	const { t } = useI18nContext();

	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				onCancel={onCancel}
				buttonLabel={t?.approve}
			>
				<Section primary={t?.filterByRegion}>
					<FormSelectField
						name='region'
						label={t?.region}
						control={control}
						options={[t?.all, ...constants.REGIONS]}
						margin='none'
					/>
				</Section>
				<Section primary={t?.activityStatus}>
					<FormSelectField
						name='status'
						label={t?.status}
						control={control}
						options={[
							{ label: t.all, value: 'all' },
							{ label: t.approved, value: 'approved' },
							{ label: t.pending, value: 'pending' },
						]}
						margin='none'
					/>
				</Section>
			</Form>
		</>
	);
}
