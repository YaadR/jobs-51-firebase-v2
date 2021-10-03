import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useI18nContext from "../hooks/general/useI18nContext";
import Dialog from "./Dialog";

export default function ApprovalDialog({ text, onApprove, ...rest }) {
	const { t } = useI18nContext();

	return (
		<Dialog dir='rtl' title={t?.approveAction} {...rest}>
			<Typography variant='body1' color='text.secondary'>
				{text}
			</Typography>
			<Box pt={4} display='flex' justifyContent='flex-end'>
				<Button onClick={rest?.onClose} sx={{ mx: 1 }} color='inherit'>
					{t?.cancel}
				</Button>
				<Button onClick={onApprove} color='primary' variant='contained'>
					{t?.approve}
				</Button>
			</Box>
		</Dialog>
	);
}
