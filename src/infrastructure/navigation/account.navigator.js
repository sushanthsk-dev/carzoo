import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "../../features/account/screens/account.screen";
import { LoginScreen } from "../../features/account/screens/login.screen";
import { RegisterScreen } from "../../features/account/screens/register.screen";
import { VerifyScreen } from "../../features/account/screens/verify.screen";
const Stack = createStackNavigator();

export const AccountNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
