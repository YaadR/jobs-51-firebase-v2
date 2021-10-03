import { Button } from "@mui/material";
import { Box } from "@mui/system";
import useI18nContext from "../hooks/general/useI18nContext";

export default function Form({ buttonLabel, onSubmit, onCancel, children }) {
	const { t } = useI18nContext();

	return (
		<form onSubmit={onSubmit}>
			{children}
			<Box mt={4} display='flex' justifyContent='flex-end'>
				<Button sx={{ mx: 1 }} onClick={onCancel} color='inherit'>
					{t?.cancel}
				</Button>
				<Button variant='contained' color='primary' type='submit'>
					{buttonLabel || t?.submit}
				</Button>
			</Box>
		</form>
	);
}
