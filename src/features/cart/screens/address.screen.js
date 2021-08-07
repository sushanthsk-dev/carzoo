import React, { useState, useContext } from "react";
import styled from "styled-components/native";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Button, ActivityIndicator, Colors } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { IPADDRESS } from "../../../utils/env";
import { Header } from "../../../components/header/header.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { InputController } from "../../../components/form-control/input-control.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { AddressContext } from "../../../services/address/address.context";

const AddressContainer = styled.View`
  margin-top: 50px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PincodeCityContainer = styled.View`
  flex-direction: row;
  width: 340px;
  justify-content: space-between;
`;

const AddressButton = styled(Button)`
  width: 340px;
`;

export const AddressScreen = ({ navigation }) => {
  const [loading, setloading] = useState(false);
  const { address, addAddress, isLoading, setAddress, error, setError } =
    useContext(AddressContext);
  const {
    register,
    setPlaceValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: address ? address.address : "",
      city: address ? address.city : "",
      pincode: address ? address.pincode : "",
      state: address ? address.state : "",
      phoneno: address ? address.phoneno.toString() : "",
    },
  });

  const { getLoggedSession } = useContext(AuthenticationContext);
  const onSubmit = async (data) => {
    setloading(true);
    const value = await getLoggedSession();
    try {
      const res = await axios({
        method: "PATCH",
        headers: { Authorization: `Bearer ${value.token}` },
        url: `${IPADDRESS}/api/v1/users/updateMe`,
        data: {
          phoneno: data.phoneno, 
          address: address,
        },
      });
      if (res.data.status === "success") {
        setAddress(res.data.data.address);
        setloading(false);
        navigation.navigate("CheckoutScreen");
      }
      setloading(false);
    } catch (e) {
      setError(e.response.data.message);
      setloading(false);
    }
    // ``    setTimeout(() => {
    //       navigation.navigate("CheckoutScreen");
    //     }, 100);``
  };

  return (
    <SafeArea>
      <Header title="Manage Address" toLeft={true} navigation={navigation} />
      <ScrollView>
        <AddressContainer>
          <KeyboardAvoidingView behavior="height">
            <Spacer size="four_large">
              <InputController
                label="Address(Required)*"
                rules={{ required: true }}
                name="address"
                placeValue={setPlaceValue}
                divide={false}
                text={true}
                control={control}
              />
              {errors.address && (
                <Text variant="error">Please enter the address</Text>
              )}
            </Spacer>
            <PincodeCityContainer>
              <Spacer size="four_large">
                <InputController
                  label="Pincode(Required)*"
                  rules={{ required: true }}
                  name="pincode"
                  readOnly={true}
                  defaultValue={574227}
                  divide={true}
                  text={false}
                  control={control}
                />
                {errors.pincode && (
                  <Text variant="error">Pincode is required</Text>
                )}
              </Spacer>
              <Spacer size="four_large">
                <InputController
                  label="City(Required)*"
                  rules={{ required: true }}
                  name="city"
                  divide={true}
                  text={true}
                  control={control}
                />
                {errors.city && <Text variant="error">City is required</Text>}
              </Spacer>
            </PincodeCityContainer>
            <Spacer size="four_large">
              <InputController
                label="State(Required)*"
                rules={{ required: true }}
                name="state"
                text={true}
                divide={false}
                control={control}
              />

              {errors.state && <Text variant="error">State is required</Text>}
            </Spacer>
            <Spacer size="four_large">
              <InputController
                label="Phone number(Required)*"
                rules={{ required: true }}
                name="phoneno"
                divide={false}
                text={false}
                control={control}
              />
              {errors.phoneno && (
                <Text variant="error">Phone number is required</Text>
              )}
            </Spacer>
            <Spacer size="four_large">
              {!isLoading || !loading ? (
                <AddressButton
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
                >
                  Save Address
                </AddressButton>
              ) : (
                <ActivityIndicator animating={true} color={Colors.blue300} />
              )}
            </Spacer>
          </KeyboardAvoidingView>
        </AddressContainer>
      </ScrollView>
    </SafeArea>
  );
};
