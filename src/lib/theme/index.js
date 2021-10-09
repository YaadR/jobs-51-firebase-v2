import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
	direction: "rtl",
	palette: {
		secondary: {
			main: "#e89c68",
		},
	},
	typography: {
		fontFamily: ["Rubik"],

		h1: {
			fontSize: "1.6rem",
			fontWeight: 600,
		},

		h2: {
			fontSize: "1.6rem",
			fontWeight: 600,
		},

		h3: {
			fontSize: "1.4rem",
			fontWeight: 600,
		},

		h4: {
			fontSize: "1.2rem",
			fontWeight: 600,
		},

		h5: {
			fontSize: "1rem",
			fontWeight: 600,
		},

		body1: {},

		body2: {},

		button: {
			fontFamily: ["Rubik"],
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				disableRipple: true,
			},
		},

		MuiAvatar: {
			defaultProps: {
				variant: "circle",
			},
		},

		MuiTextField: {
			defaultProps: {
				margin: "normal",
			},
		},

		MuiFormControl: {
			defaultProps: {
				margin: "normal",
			},
		},

		MuiListItemIcon: {
			defaultProps: {
				style: {
					minWidth: 40,
				},
			},
		},
	},
});

export const themes = {
	light: baseTheme,
};
