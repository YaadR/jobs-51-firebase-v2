import { Chip, Grid } from "@mui/material";
import useI18nContext from "../hooks/general/useI18nContext";
import useUserQuery from "../hooks/users/useUserQuery";

export default function UserBadges({ uid }) {
	const { data } = useUserQuery(uid);
	const { t } = useI18nContext();
	const isVolunteer = data?.volunteer;

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
