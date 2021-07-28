import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ProfileCard } from "../components/profile-card.component";
import { Text } from "../../../components/typography/text.component";

const Tab = createMaterialTopTabNavigator();

const OrderContainer = styled.View`
  margin-top: 56px;
  flex: 1;
`;

const CardContainer = styled(ScrollView)`
  background-color: #fff;
`;

const AddButton = styled(TouchableOpacity)`
  position: absolute;
  z-index: 999;
  border-radius: 25px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  padding: ${(props) => props.theme.space[2]};
  bottom: 20px;
  right: 24px;
`;

export const ManageProfile = ({ navigation, name }) => {
  const ActiveUser = () => {
    return (
      <>
        <CardContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileViewScreen", { name: name })
            }
          >
            <ProfileCard name={name} />
          </TouchableOpacity>
          <ProfileCard name={name} />
          <ProfileCard name={name} />
          <ProfileCard name={name} />
        </CardContainer>
        <AddButton
          onPress={() => navigation.navigate("AddUserScreen", { name: name })}
        >
          <AntDesign name="adduser" size={24} color="white" />
        </AddButton>
      </>
    );
  };
  const DeactivedUser = () => {
    return (
      <CardContainer>
        <ProfileCard name={name} />
        <ProfileCard name={name} />
        <ProfileCard name={name} />
      </CardContainer>
    );
  };

  return (
    <SafeArea>
      <Header toLeft={true} navigation={navigation} title={`Manage ${name}`} />
      <OrderContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Active"
            options={({ route }) => ({
              tabBarLabel: `Active ${name}`,
            })}
            component={ActiveUser}
            initialParams={{ name: "activated" }}
          />
          <Tab.Screen
            name="Deactived"
            options={({ route }) => ({
              tabBarLabel: `Deactived ${name}`,
            })}
            component={DeactivedUser}
            initialParams={{ name: "deactivated" }}
          />
        </Tab.Navigator>
      </OrderContainer>
    </SafeArea>
  );
};
