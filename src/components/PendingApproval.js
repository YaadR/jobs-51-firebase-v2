import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useI18nContext from "../hooks/general/useI18nContext";

export default function PendingApproval() {
	const { t } = useI18nContext();

	return (
		<Container>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				textAlign='center'
        maxWidth={400}
        margin='auto'
        marginTop={24}
			>
				<Typography variant='h4'>{t?.userPendingApproval}</Typography>
			</Box>
		</Container>
	);
}
