import { useTheme } from "@emotion/react";
import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import constants from "../constants";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useUpdateCurrentUserMutation from "../hooks/auth/useUpdateCurrentUserMutation";
import useI18nContext from "../hooks/general/useI18nContext";
import Form from "./form/Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSelectField from "./form/FormSelectField";
import FormTextField from "./form/FormTextField";

const schema = yup
	.object({
		description: yup.string().required(),
		date: yup.string().required(),
		total: yup.number().positive().required(),
	})
	.required();

export default function ActivityForm({
	onCancel,
	defaultValues,
	onSubmit,
	isLoading,
}) {
	const { data: currentUserRegion } = useCurrentUserQuery({
		select: (v) => v?.region,
	});
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});
	const { mutateAsync: mutateUserAsync, isLoading: isMutatingUserAsync } =
		useUpdateCurrentUserMutation({
			onSuccess: () => alert("succes"),
		});
	const { spacing } = useTheme();
	const { t } = useI18nContext();

	return (
		<>
			<Form
				onCancel={onCancel}
				isLoading={isLoading}
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormControl disabled={!!currentUserRegion}>
					<InputLabel id='demo-simple-select-label'>{t?.region}</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={currentUserRegion}
						label={t?.region}
						onChange={(e) => mutateUserAsync({ region: e.target.value })}
					>
						{constants.REGIONS?.map((region) => (
							<MenuItem dir='rtl' value={region}>
								{region}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>{t?.regionChangeAdmin}</FormHelperText>
				</FormControl>

				<br />
				<FormSelectField
					name='type'
					options={constants.ACTIVITY_TYPES}
					control={control}
				/>
				<FormTextField
					control={control}
					name='description'
					label={t?.description}
					fullWidth
					multiline
					rows={4}
					error={!!errors?.description}
					helperText={errors?.description?.message}
					label={t?.description}
				/>
				<Controller
					control={control}
					name='total'
					render={({ field }) => (
						<TextField
							style={{ marginLeft: spacing(2) }}
							step='0.5'
							label={t?.hours}
							error={!!errors?.total}
							helperText={errors?.total?.message}
							label={t?.totalHours}
							type='number'
							{...field}
						/>
					)}
				/>
				<Controller
					control={control}
					name='date'
					render={({ field }) => (
						<TextField
							fullWidth
							error={!!errors?.date}
							helperText={errors?.date?.message}
							label={t?.date}
							type='date'
							{...field}
						/>
					)}
				/>
			</Form>
		</>
	);
}
