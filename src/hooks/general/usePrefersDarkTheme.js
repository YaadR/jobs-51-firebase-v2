import { useMediaQuery } from "@mui/material";

export default function usePrefersDarkTheme() {
	return useMediaQuery("(prefers-color-scheme: dark)");
}
