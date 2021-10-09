import { Box } from "@mui/system";
import PrimaryAndSecondaryTypography from "./PrimaryAndSecondaryTypography";

export default function EmptyState({ renderBefore, ...rest }) {
	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			{renderBefore}
			<PrimaryAndSecondaryTypography {...rest} />
		</Box>
	);
}
