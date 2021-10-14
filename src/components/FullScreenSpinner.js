import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export default function FullScreenSpinner() {
  return (
		<Box
			height='100vh'
			width='100vw'
			display='flex'
			alignItems='center'
			justifyContent='center'
		>
			<CircularProgress color='primary' size={32} />
		</Box>
	);
}
