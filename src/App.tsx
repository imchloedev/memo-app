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
import { styled } from "styled-components/native";
import { PaperProvider, useTheme } from "react-native-paper";

function App(): JSX.Element {
  const theme = useColorScheme();
  const paperTheme = useTheme();
  paperTheme.colors.secondaryContainer = "transparent";

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000); //스플래시 활성화 시간 2초
  });

  return (
    <RecoilRoot>
      <PaperProvider>
        <ThemeProvider theme={theme === "dark" ? dark : light}>
          <Navigator />
        </ThemeProvider>
      </PaperProvider>
    </RecoilRoot>
  );
}

export default App;

// const Layout = styled.View`
//   background-color: ${({ theme }) => theme.color.bg};
// `;
