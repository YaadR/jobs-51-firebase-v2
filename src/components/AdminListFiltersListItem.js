import {
	Chip,
	ListItemButton,
	ListItemText,
	Popover,
	TextField,
} from "@mui/material";
import { useState } from "react";
import useAdminUsersContext from "../hooks/general/useAdminUsersContext";
import useAnchorEl from "../hooks/general/useAnchorEl";
import useI18nContext from "../hooks/general/useI18nContext";

export default function AdminListFiltersListItem({
	label,
	options,
	isSelected,
	isSearchable,
	onOptionClick,
	onDelete,
	...rest
}) {
	const [elementProps, triggerProps] = useAnchorEl();
	const [value, setValue] = useState("");
	const { query } = useAdminUsersContext();
  const { t } = useI18nContext();

	const props = !!onDelete
		? {
				onDelete,
				...rest,
		  }
		: {
				...rest,
		  };

	return (
		<>
			<Chip
				color={isSelected ? "primary" : "default"}
				label={label}
				{...triggerProps}
				{...props}
			/>
			<Popover {...elementProps}>
				{isSearchable && (
					<TextField
						sx={{ mx: 2 }}
						size='small'
						value={value}
						onChange={(e) => setValue(e.target.value)}
						label={t?.fullName}
					/>
				)}
				{options
					?.filter((user) =>
						isSearchable
							? user?.toLowerCase?.()?.includes?.(value?.toLowerCase?.())
							: !!user
					)
					?.map((innerOption) => (
						<ListItemButton selected={isSelected} button onClick={() => onOptionClick(innerOption)}>
							<ListItemText primary={innerOption} key={innerOption} />
						</ListItemButton>
					))}
			</Popover>
		</>
	);
}
