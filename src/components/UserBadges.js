import { Chip, Grid } from "@mui/material";
import { Box } from "@mui/system";
import useCurrentUserQuery from "../hooks/auth/useCurrentUserQuery";
import useI18nContext from "../hooks/general/useI18nContext";

export default function UserBadges({ uid }) {
	const { data } = useCurrentUserQuery(uid);
	const { t } = useI18nContext();
	const isVolunteer = data?.volunteer;

	// if (!data) return <Box height={32} />;

	return (
		<Grid container spacing={1}>
			{isVolunteer && (
				<Grid item>
					<Chip
						color='primary'
						size='small'
						variant='outlined'
						label={t?.activeVolunteer}
					/>
				</Grid>
			)}
			<Grid item>
				<Chip
					color='primary'
					size='small'
					variant='outlined'
					label={t?.[data?.role]}
				/>
			</Grid>
		</Grid>
	);
}
