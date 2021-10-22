import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from "./form/FormTextField";
import { Button } from "@mui/material";
import useI18nContext from "../hooks/general/useI18nContext";

const schema = yup
	.object({
		email: yup.string().required(),
		password: yup.string().required(),
	})
	.required();

export default function SignInForm({ onSubmit }) {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});
	const { t } = useI18nContext();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormTextField
				error={errors?.email}
				helperText={errors?.email?.message}
				label={t?.email}
				fullWidth
				name='email'
				control={control}
			/>
			<FormTextField
				error={errors?.password}
				helperText={errors?.password?.message}
				label={t?.password}
				fullWidth
				name='password'
				type='password'
				control={control}
			/>
			<Button sx={{ mt: 2 }} type='submit' fullWidth variant='contained'>
				{t?.signIn}
			</Button>
		</form>
	);
}
