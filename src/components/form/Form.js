import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import useI18nContext from "../../hooks/general/useI18nContext";

export default function Form({
	buttonLabel,
	onSubmit,
	onCancel,
	children,
	isLoading,
  cancelButton = true,
  buttonProps
}) {
	const { t } = useI18nContext();

	return (
		<form onSubmit={onSubmit}>
			{children}
			<Box mt={4} display='flex' justifyContent='flex-end'>
				{cancelButton && (
					<Button
						disabled={isLoading}
						sx={{ mx: 1 }}
						onClick={onCancel}
						color='inherit'
					>
						{t?.cancel}
					</Button>
				)}
				<LoadingButton
					disabled={isLoading}
					variant='contained'
					color='primary'
					type='submit'
					loading={isLoading}
					{...buttonProps}
				>
					{buttonLabel ?? t?.submit}
				</LoadingButton>
			</Box>
		</form>
	);
}
