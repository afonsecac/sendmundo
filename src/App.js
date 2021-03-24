import React from "react";
import {
  MuiThemeProvider as ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import DoneIcon from "@material-ui/icons/Done";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { SnackbarProvider } from "notistack";
import { themeDefault } from "themes/DefaultTheme";
import UserLayout from "layout/UserLayout";

function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <SnackbarProvider
        maxSnack={3}
        iconVariant={{
          success: <DoneIcon />,
          error: <HighlightOffIcon />,
          warning: <WarningIcon />,
          info: <InfoIcon />,
        }}
      >
        <CssBaseline />
        <UserLayout />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
