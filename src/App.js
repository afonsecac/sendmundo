import React from "react";
import {
  MuiThemeProvider as ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import { themeDefault } from "themes/DefaultTheme";
import UserLayout from "layout/UserLayout";

function App() {
  return (
    <ThemeProvider theme={themeDefault}>
      <CssBaseline />
      <UserLayout />
    </ThemeProvider>
  );
}

export default App;
