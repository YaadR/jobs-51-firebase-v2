import { useState } from "react";

export default function useToggle(initialState = false) {
	const [v, setV] = useState(initialState);

	return [v, () => setV((o) => !o), setV];
}
