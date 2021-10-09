import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function PrimaryAndSecondaryTypography({
	primary,
	primaryProps,
	secondary,
	secondaryProps,
	containerProps,
}) {
	return (
		<Box py={2} {...containerProps}>
			<Typography gutterBottom variant='h5' {...primaryProps}>
				{primary}
			</Typography>
			<Typography variant='body1' color='text.secondary' {...secondaryProps}>
				{secondary}
			</Typography>
		</Box>
	);
}
