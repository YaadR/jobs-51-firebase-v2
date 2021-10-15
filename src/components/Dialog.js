import { useTheme } from "@emotion/react";
import {
	Dialog as MDialog,
	DialogContent,
	DialogTitle,
	IconButton,
} from "@mui/material";
import { RiCloseFill } from "react-icons/ri";

export default function Dialog({ children, title, ...rest }) {
	const { spacing } = useTheme();
	return (
		<MDialog dir='rtl' PaperProps={{ style: { position: "relative" } }} {...rest}>
			<DialogTitle>{title}</DialogTitle>
			<IconButton
				onClick={rest?.onClose}
				sx={{ position: "absolute", top: spacing(2), right: spacing(2) }}
			>
				<RiCloseFill size={24} />
			</IconButton>
			<DialogContent>{children}</DialogContent>
		</MDialog>
	);
}
