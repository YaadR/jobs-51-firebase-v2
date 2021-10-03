import { createTheme } from "@mui/material/styles";

const baseTheme = createTheme({
	direction: "rtl",
  palette: {
    mode: 'dark'
  },
	typography: {
		h3: {
			fontSize: "1.6rem",
		},

    h4: {
			fontSize: "1.2rem",
		},

    h5: {
			fontSize: "1rem",
		},
	},
	components: {
		MuiAvatar: {
			defaultProps: {
				variant: "circle",
			},
		},

    MuiTextField: {
      defaultProps: {
        margin: 'normal'
      }
    },

    MuiFormControl: {
      defaultProps: {
        margin: 'normal'
      }
    }
	},
});

export const themes = {
	light: createTheme(baseTheme, {}),
};
