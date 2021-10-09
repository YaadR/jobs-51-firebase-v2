import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
	direction: "rtl",
	palette: {
		mode: "light",

		secondary: {
			main: "#e89c68",
		},
	},
	typography: {
		fontFamily: ["Rubik"],

		h1: {
			fontSize: "1.6rem",
      fontWeight: 600
		},

		h2: {
			fontSize: "1.6rem",
      fontWeight: 600
		},

		h3: {
			fontSize: "1.4rem",
      fontWeight: 600
		},

		h4: {
      fontSize: "1.2rem",
      fontWeight: 600
		},

		h5: {
      fontSize: "1rem",
      fontWeight: 600
		},

		body1: {
    },

		body2: {
    },

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
	},
});

export const themes = {
	light: createTheme(baseTheme, {}),
};
