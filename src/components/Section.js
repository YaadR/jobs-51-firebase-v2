import { Box } from "@mui/system";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";

export default function Section({ primary, secondary, children }) {
	return (
		<Box sx={{ mb: 4 }}>
			<PrimaryAndSecondaryTypography primary={primary} secondary={secondary} />
			{children}
		</Box>
	);
}
