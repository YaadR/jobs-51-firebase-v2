import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormSelectField({
	control,
	name,
	label,
	options,
	...fieldProps
}) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<FormControl
					error={!!control?._formState?.errors?.[name]}
					fullWidth
					{...fieldProps}
				>
					<InputLabel id='demo-simple-select-label-1'>{label}</InputLabel>
					<Select
						labelId='demo-simple-select-label-1'
						id='demo-simple-select-1'
						label={label}
						{...field}
					>
						{options?.map((option) => (
							<MenuItem
								dir='rtl'
								value={option?.value ?? option}
								key={option?.value ?? option}
							>
								{option?.label ?? option}
							</MenuItem>
						))}
					</Select>
					<FormHelperText>
						{control?._formState?.errors?.[name]?.message}
					</FormHelperText>
				</FormControl>
			)}
		/>
	);
}
