import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import useI18nContext from "../hooks/general/useI18nContext";
import Dialog from "./Dialog";

export default function ApprovalDialog({
	text,
	isLoading,
	primaryButtonProps,
	onApprove,
	...rest
}) {
	const { t } = useI18nContext();

	return (
		<Dialog dir='rtl' title={t?.approveAction} {...rest}>
			<Typography variant='body1' color='text.secondary'>
				{text}
			</Typography>
			<Box pt={4} display='flex' justifyContent='flex-end'>
				<LoadingButton
					disabled={isLoading}
					onClick={rest?.onClose}
					sx={{ mx: 1 }}
					color='inherit'
				>
					{t?.cancel}
				</LoadingButton>
				<LoadingButton
					loading={isLoading}
					onClick={onApprove}
					color='primary'
					variant='contained'
					{...primaryButtonProps}
				>
					{t?.approve}
				</LoadingButton>
			</Box>
		</Dialog>
	);
}
