import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AccountNavigator } from "./account.navigator";
import { AppNavigator } from "./app.navigator";
import { AdminHomeNavigator } from "./admin-home.navigator";
import { AgentHomeNavigator } from "./agent.navigator";
import { MechanicHomeNavigator } from "./mechanic-home.navigator";
import { MechanicNavigator } from "./mechanic.navigator";

export const Navigation = () => {
  const isAuthenticated = true;
  const role = "mechanic";
  return (
    <NavigationContainer>
      {isAuthenticated ? (
        role ? (
          role === "agent" ? (
            <AgentHomeNavigator />
          ) : role === "mechanic" ? (
            <MechanicNavigator />
          ) : (
            <AdminHomeNavigator />
          )
        ) : (
          <AppNavigator />
        )
      ) : (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};
