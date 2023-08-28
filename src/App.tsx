/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Suspense, useEffect, useState } from "react";
import { ThemeProvider, styled } from "styled-components/native";
import { RecoilRoot } from "recoil";
import {
  ActivityIndicator,
  useColorScheme,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { PaperProvider, useTheme } from "react-native-paper";
import Navigator from "./Navigator";
import { dark, light } from "styles/theme";
import { subscribeAuth } from "~/apis";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";
// import { ReactQueryDevtools } from "react-query-devtools/native";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <PaperProvider>
          <ThemeProvider theme={theme === "dark" ? dark : light}>
            {initializing ? <ActivityIndicator /> : <Navigator />}
          </ThemeProvider>
        </PaperProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
