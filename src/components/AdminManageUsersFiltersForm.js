import { Controller, useForm } from "react-hook-form";
import useI18nContext from "../hooks/general/useI18nContext";
import Form from "./form/Form";
import Section from "./Section";
import useUsersQuery from "../hooks/users/useUsersQuery";
import FormSelectField from "./form/FormSelectField";
import { Autocomplete, TextField } from "@mui/material";
import constants from "../constants";

export default function AdminManageUsersFiltersForm({ onCancel, onSubmit, defaultValues }) {
	const { handleSubmit, control } = useForm({
		defaultValues,
	});
	const { t } = useI18nContext();
	const { data: users } = useUsersQuery();

	const usersDisplayNames = users
		?.filter((u) => !!u?.displayName)
		?.map((u) => ({
			label: u?.displayName,
			value: u?.displayName,
		}));

	return (
		<>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				onCancel={onCancel}
				buttonLabel={t?.approve}
			>
				<Section primary={t?.filterByFullName}>
					<Controller
						control={control}
						name='displayName'
						render={({ field }) => (
							<Autocomplete
								onChange={(e, v) => field.onChange(v?.value)}
								disablePortal
								getOptionLabel={(o) => o?.label}
								id='combo-box-demo'
								options={usersDisplayNames}
								renderInput={(params) => (
									<TextField {...params} label={t?.fullName} margin='none' />
								)}
							/>
						)}
					/>
				</Section>
				<Section primary={t?.filterByRegion}>
					<FormSelectField
						name='region'
						label={t?.region}
						control={control}
						options={constants.REGIONS}
						margin='none'
					/>
				</Section>
				<Section primary={t?.filterByRole}>
					<FormSelectField
						name='role'
						label={t?.role}
						control={control}
						options={Object.values(constants.ROLES)?.map((v) => ({
							label: t?.[v],
							value: v,
						}))}
						margin='none'
					/>
				</Section>
			</Form>
		</>
	);
}
