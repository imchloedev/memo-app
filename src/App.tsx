/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { useColorScheme } from "react-native";
import { dark, light } from "./styles/theme";
import Navigator from "./Navigator";
import SplashScreen from "react-native-splash-screen";

function App(): JSX.Element {
  const theme = useColorScheme();

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간 2초
  });

  return (
    <RecoilRoot>
      <ThemeProvider theme={theme === "dark" ? dark : light}>
        <Navigator />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
