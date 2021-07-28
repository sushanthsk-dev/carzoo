import React, { useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

const ForgotPasswordContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${(props) => props.theme.space[3]};
`;

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  LogoImageContainer,
  LinkText,
} from "../components/account.styles";
import { TouchableWithoutFeedback } from "react-native";
export const AdminLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { onLogin, isLoading, error } = useContext(AuthenticationContext);
  const error = false;
  const isLoading = false;
  return (
    <AccountBackground>
      <LogoImageContainer source={require("../../../../assets/logo1.png")} />
      <Text variant="title">Admin Login</Text>
      <AccountContainer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && (
          <Spacer size="large">
            <ErrorContainer>
              <Text variant="error">{error.split(": ")[1]}</Text>
            </ErrorContainer>
          </Spacer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => onLogin(email, password)}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
        <ForgotPasswordContainer>
          <TouchableWithoutFeedback onPress={() => console.log("Forget")}>
            <LinkText variant="body">Forget Password?</LinkText>
          </TouchableWithoutFeedback>
        </ForgotPasswordContainer>
      </AccountContainer>
      <Spacer>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Login")}>
          <LinkText variant="body">User Login</LinkText>
        </TouchableWithoutFeedback>
      </Spacer>
    </AccountBackground>
  );
};
