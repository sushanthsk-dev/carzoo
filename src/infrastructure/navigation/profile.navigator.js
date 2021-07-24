import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { ProfileScreen } from "../../features/profile/screens/profile.screens";
import { MyProfileScreen } from "../../features/profile/screens/my-profile.screens";
import { MyOrderScreen } from "../../features/profile/screens/my-order.screen";
import { OrderSummary } from "../../features/profile/screens/order-summary";
import { MyCarScreen } from "../../features/profile/screens/my-car.screen";

const ProfileStack = createStackNavigator();

export const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.SlideFromRightIOS }}
    >
      <ProfileStack.Screen name="MyCarScreen" component={MyCarScreen} />
      <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <ProfileStack.Screen name="MyOrderScreen" component={MyOrderScreen} />
      <ProfileStack.Screen name="OrderSummary" component={OrderSummary} />
    </ProfileStack.Navigator>
  );
};
