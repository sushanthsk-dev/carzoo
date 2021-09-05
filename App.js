import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import styled from "styled-components";
import * as Location from "expo-location";
import { ThemeProvider } from "styled-components/native";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { NetworkContextProvider } from "./src/services/internetConnectionCheck/internet-network.context";

const SplashImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [latoLoaded] = useLato({ Lato_400Regular });
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular });

  useEffect(() => {
    (async () => await Location.enableNetworkProviderAsync())();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (!latoLoaded || !montserratLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NetworkContextProvider>
          <AuthenticationContextProvider>
            {isLoading ? (
              <SplashImage source={require("./assets/splash.png")} />
            ) : (
              <Navigation />
            )}
          </AuthenticationContextProvider>
        </NetworkContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
