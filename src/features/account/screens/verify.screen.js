import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  AccountBackground,
  AccountContainer,
  AuthInput,
} from "../components/account.styles";

const Container = styled.View`
  width: 100%;
  margin-top: 100px;
`;
export const VerifyScreen = () => {
  const [code, setCode] = useState("");
  return (
    <SafeArea>
      <Container>
        <Text variant="title">Verify your email address</Text>
        <AccountContainer>
          <AuthInput
            label="Code"
            value={code}
            textContentType="numeric"
            onChangeText={(c) => setCode(c)}
          />
        </AccountContainer>
      </Container>
    </SafeArea>
  );
};
