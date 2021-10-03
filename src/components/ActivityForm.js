import { useTheme } from "@emotion/react";
import {
	FormControl,
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
import Form from "./Form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
	.object({
		description: yup.string().required(),
		date: yup.string().required(),
		total: yup.number().positive().integer().required(),
	})
	.required();

export default function ActivityForm({ onCancel, defaultValues, onSubmit }) {
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

	console.log(errors);
	return (
		<>
			<Form onCancel={onCancel} onSubmit={handleSubmit(onSubmit)}>
				<FormControl fullWidth>
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
				</FormControl>

				<Controller
					control={control}
					name='type'
					render={({ field }) => (
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label-1'>
								{t?.activityType}
							</InputLabel>
							<Select
								labelId='demo-simple-select-label-1'
								id='demo-simple-select-1'
								label={t?.activityType}
								{...field}
							>
								{constants.ACTIVITY_TYPES?.map((region) => (
									<MenuItem dir='rtl' value={region}>
										{region}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				/>
				<Controller
					control={control}
					name='description'
					render={({ field }) => (
						<TextField
							label={t?.description}
							fullWidth
							multiline
							rows={4}
							error={!!errors?.description}
							helperText={errors?.description?.message}
							label={t?.description}
							{...field}
						/>
					)}
				/>
				<Box display='flex' alignItems='center'>
					<Controller
						control={control}
						name='total'
						render={({ field }) => (
							<TextField
								style={{ marginLeft: spacing(2) }}
								step='0.5'
								label={t?.hours}
								fullWidth
								error={!!errors?.total}
								helperText={errors?.total?.message}
								label={t?.total}
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
								error={!!errors?.date}
								helperText={errors?.date?.message}
								label={t?.date}
								fullWidth
								type='date'
								{...field}
							/>
						)}
					/>
				</Box>
			</Form>
		</>
	);
}
