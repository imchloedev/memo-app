/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { ThemeProvider } from "styled-components";
import Navigator from "~/Navigator";
import { theme } from "@styles/theme";

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Navigator />
    </ThemeProvider>
  );
}

export default App;
