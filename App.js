import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import styled from "styled-components";

const SplashImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default function App() {
  const [latoLoaded] = useLato({ Lato_400Regular });
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular });

  if (!latoLoaded || !montserratLoaded) {
    return null;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1800);
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          {isLoading ? (
            <SplashImage source={require("./assets/logo.png")} />
          ) : (
            <Navigation />
          )}
        </AuthenticationContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
