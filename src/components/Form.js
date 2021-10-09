import { CircularProgress, Button } from "@mui/material";
import { Box } from "@mui/system";
import useI18nContext from "../hooks/general/useI18nContext";

export default function Form({
	buttonLabel,
	onSubmit,
	onCancel,
	children,
	isLoading,
}) {
	const { t } = useI18nContext();

	return (
		<form onSubmit={onSubmit}>
			{children}
			<Box mt={4} display='flex' justifyContent='flex-end'>
				<Button
					disabled={isLoading}
					sx={{ mx: 1 }}
					onClick={onCancel}
					color='inherit'
				>
					{t?.cancel}
				</Button>
				<Button
					disabled={isLoading}
					variant='contained'
					color='primary'
					type='submit'
				>
					{isLoading ? (
						<CircularProgress size={24} color='inherit' />
					) : (
						`${buttonLabel || t?.submit}`
					)}
				</Button>
			</Box>
		</form>
	);
}
