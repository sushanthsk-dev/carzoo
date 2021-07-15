import { StatusBar } from "expo-status-bar";
import React from "react";
import { PeriodicServiceContextProvider } from "./src/services/periodicservice/periodicservice.context";
import { ThemeProvider } from "styled-components/native";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import {
  useFonts as useMontserrat,
  Montserrat_400Regular,
} from "@expo-google-fonts/montserrat";

import { theme } from "./src/infrastructure/theme";
import { SafeArea } from "./src/components/utility/safe-area.component";
import { Text } from "./src/components/typography/text.component";
import { Navigation } from "./src/infrastructure/navigation";
import { CartContextProvider } from "./src/services/Cart/cart.context";
import { DateContextProvider } from "./src/services/date-time/dateTime.context";
export default function App() {
  const [latoLoaded] = useLato({ Lato_400Regular });
  const [montserratLoaded] = useMontserrat({ Montserrat_400Regular });

  if (!latoLoaded || !montserratLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <PeriodicServiceContextProvider>
          <CartContextProvider>
            <DateContextProvider>
              <Navigation />
            </DateContextProvider>
          </CartContextProvider>
        </PeriodicServiceContextProvider>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
