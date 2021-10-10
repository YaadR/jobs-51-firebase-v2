import { Grid } from "@mui/material";
import useAdminUsersContext from "../hooks/general/useAdminUsersContext";
import AdminListFiltersListItem from "./AdminListFiltersListItem";

export default function AdminListFilters({ options }) {
	const { updateQuery, query } = useAdminUsersContext();

	return (
		<>
			<Grid container spacing={1}>
				{options?.map((option) => {
					const isSelected = !!query?.[option?.label];

					return (
						<Grid item>
							<AdminListFiltersListItem
								onOptionClick={(value) => {
									updateQuery({ [option?.label]: value });
								}}
								{...option}
								isSelected={isSelected}
								// onDelete={() => null}
								key={option?.label}
							/>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
