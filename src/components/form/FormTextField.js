import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormTextField({ control, name, label, ...fieldProps }) {
  return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<TextField
					error={!!control?._formState?.errors?.[name]}
					label={label}
					helperText={control?._formState?.errors?.[name]?.message}
					{...field}
					{...fieldProps}
				/>
			)}
		/>
	);
}
