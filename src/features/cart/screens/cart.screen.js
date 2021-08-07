import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, Button } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { CommonButton } from "../components/cart.styles";
import { Header } from "../../../components/header/header.component";
import { CartCard } from "../components/cart.component";
import { CartContext } from "../../../services/Cart/cart.context";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { validate } from "validate.js";
import { colors } from "../../../infrastructure/theme/colors";

const CartContainer = styled.View`
  margin-top: 56px;
  width: 100%;
  height: 100%;
`;
const PincodeInput = styled(TextInput)`
  width: 240px;
`;
const CheckoutButton = styled(Button).attrs({
  color: colors.bg.primary,
})`
  position: absolute;
  bottom: 10px;
  background-color: ${(props) => props.theme.colors.brand.primary};
  margin: ${(props) => props.theme.space[2]};
  width: 96%;
`;

const PincodeContainer = styled.View`
  flex-direction: row;
  width: 340px;
  margin: 0 auto;
  justify-content: space-around;
`;

const SubmitButton = styled(Button)`
  top: 5px;
  height: 60px;
  justify-content: center;
`;
export const CartScreen = ({ route, navigation }) => {
  const [pincode, setPincode] = useState(null);
  const [disable, setDisable] = useState(true);
  const [successText, setSuccessText] = useState(null);
  const [pincodeError, setPincodeError] = useState(null);

  const validatePin = (pin) => {
    return /^(\d{4}|\d{6})$/.test(pin);
  };
  const onSubmit = () => {
    setPincodeError(null);
    setSuccessText(null);
    if (!pincode) {
      return setPincodeError("Please enter the pincode");
    }
    const value = validatePin(pincode);
    if (!value) {
      return setPincodeError("Enter the correct pincode format");
    }
    if (pincode != 574227) {
      setDisable(true);
      return setPincodeError(
        "Sorry the service is not available in the entered pincode"
      );
    }
    setDisable(false);
    setSuccessText("Service is available in the entered pincode");
    console.log(pincode);
  };
  const { cart } = React.useContext(CartContext);
  let toLeftBoolean = false;
  const { toLeft, servicePlan } = route.params;
  toLeftBoolean = toLeft === true ? true : false;

  return (
    <SafeArea>
      <Header title="Cart" toLeft={toLeftBoolean} navigation={navigation} />
      {!!cart.id && (
        <>
          <CartContainer>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("PeriodicServiceDetails", {
                  servicePlan: servicePlan,
                });
              }}
            >
              <CartCard />
            </TouchableOpacity>
            <Spacer position="top" size="large" />
            <Spacer position="left" size="medium">
              <Text variant="label">
                Check whether the service available on your city
              </Text>
            </Spacer>

            <Spacer position="top" size="medium" />
            <PincodeContainer>
              <PincodeInput
                keyboardType="numeric"
                mode="outlined"
                label="Enter pincode"
                onChangeText={(t) => setPincode(t)}
                value={pincode}
              />
              <SubmitButton mode="contained" onPress={() => onSubmit()}>
                Check
              </SubmitButton>
            </PincodeContainer>
            {pincodeError !== null && (
              <>
                <Spacer position="top" size="medium" />
                <Spacer position="left" size="large">
                  <Text variant="error">{pincodeError}</Text>
                </Spacer>
              </>
            )}
            {successText !== null && (
              <>
                <Spacer position="top" size="medium" />
                <Spacer position="left" size="large">
                  <Text variant="success">{successText}</Text>
                </Spacer>
              </>
            )}
          </CartContainer>
          <CheckoutButton
            disabled={disable}
            onPress={() => {
              console.log("HE", typeof pincode);
              if (parseInt(pincode) === 574227) {
                navigation.navigate("CheckoutScreen", {
                  servicePlan: servicePlan,
                });
              } else {
                onSubmit();
              }
            }}
          >
            Go to Checkout
          </CheckoutButton>
        </>
      )}
      {!cart.id && (
        <CartContainer>
          <Spacer>
            <Text>Cart is Empty</Text>
            <TouchableOpacity onPress={() => navigation.popToTop()}>
              <Text>Click here to go Home</Text>
            </TouchableOpacity>
          </Spacer>
        </CartContainer>
      )}
    </SafeArea>
  );
};
