import { Chip, Grid, ListItem, ListItemText, Popover } from "@mui/material";
import useAnchorEl from "../hooks/general/useAnchorEl";

export default function AdminListFiltersListItem({
	label,
	options,
	isSelected,
	onOptionClick,
  onDelete,
	...rest
}) {
	const [elementProps, triggerProps] = useAnchorEl();

	return (
		<>
			<Chip
				color={isSelected ? "primary" : "default"}
				label={label}
        onDelete={onDelete}
				{...triggerProps}
			/>
			<Popover {...elementProps}>
				{options?.map((innerOption) => (
					<ListItem button onClick={() => onOptionClick(innerOption)}>
						<ListItemText primary={innerOption} key={innerOption} />
					</ListItem>
				))}
			</Popover>
		</>
	);
}
