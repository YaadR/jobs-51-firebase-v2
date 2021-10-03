import { useState } from "react";

export default function useAnchorEl() {
	const [anchorEl, setAnchorEl] = useState(null);

	const elementProps = {
		open: !!anchorEl,
		anchorEl: anchorEl,
		onClose: () => setAnchorEl(null),
	};

	const triggerProps = {
		onClick: (e) => setAnchorEl(e.currentTarget),
	};

	return [elementProps, triggerProps];
}
