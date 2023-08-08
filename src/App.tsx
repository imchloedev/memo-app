/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import { useColorScheme } from "react-native";
import { dark, light } from "./styles/theme";
import Navigator from "./Navigator";
import SplashScreen from "react-native-splash-screen";
import { PaperProvider, useTheme } from "react-native-paper";
import { subscribeAuth } from "./lib/auth";
import Splash from "./screens/Splash";

function App(): JSX.Element {
  const theme = useColorScheme();
  const paperTheme = useTheme();
  paperTheme.colors.secondaryContainer = "transparent";
  const [initializing, setInitializing] = useState(true);
  const [_, setCurrentUser] = useState(null);

  const handleAuthState = (user: any) => {
    if (user) {
      setCurrentUser(user);
      console.log("logged");
    } else {
      setCurrentUser(null);
      console.log("logged out");
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    const subscribe = subscribeAuth(handleAuthState);

    return subscribe;
  }, []);

  return (
    <RecoilRoot>
      <PaperProvider>
        <ThemeProvider theme={theme === "dark" ? dark : light}>
          {initializing ? <Splash /> : <Navigator />}
        </ThemeProvider>
      </PaperProvider>
    </RecoilRoot>
  );
}

export default App;
