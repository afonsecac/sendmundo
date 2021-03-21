import { createMuiTheme } from "@material-ui/core/styles";

export const themeDefault = createMuiTheme({
  overrides: {
    MuiInput: {
      // Name of the styleSheet
      underline: {
        "&:hover:not($disabled):before": {
          border: "#0073a7",
          height: 1,
        },
      },
    },
  },
});
