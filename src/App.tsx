/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { useColorScheme } from "react-native";
import { dark, light } from "./styles/theme";
import Navigator from "./Navigator";

function App(): JSX.Element {
  const theme = useColorScheme();

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
        <Navigator />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
