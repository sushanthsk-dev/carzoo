import React, { useState } from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { DateView } from "../../../components/date-time/date.component";
import { Header } from "../../../components/header/header.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { DateContext } from "../../../services/date-time/date.context";
import { TimeView } from "../../../components/date-time/time.component";
import {
  getDate,
  getTime,
} from "../../../services/date-time/date-time.service";
import { TimeContext } from "../../../services/date-time/time.context";
import { AddressCard } from "../components/address-card.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AddressContext } from "../../../services/address/address.context";

const CheckoutContainer = styled.View``;
const DateTimeContainer = styled.View``;
const AddressContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;

const AddressButton = styled(Button)`
  margin: ${(props) => props.theme.space[1]};
`;
const DateContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
const DateSelectView = styled.View`
  flex-direction: row;
`;

const TimeContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
const PaymentContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: ${(props) => props.theme.space[2]};
`;
const BillContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
`;
const BillCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]};
`;
const TimeSelectView = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const CancelButton = styled(Button)`
  flex: 0.5;
`;

export const CheckoutScreen = ({ navigation, route }) => {
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [pickupTime, setPickupTime] = useState([]);
  // const [address, setAddress] = useState({});
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const { date, addDate, removeDate } = React.useContext(DateContext);

  const { time, addTime, removeTime } = React.useContext(TimeContext);
  const { address } = React.useContext(AddressContext);

  //const { servicePlan } = route.params;
  const servicePlan = {
    title: "Basic Service",
    price: 1009,
  };
  const setData = () => {
    const dateData = getDate();
    const timeData = getTime(dateData[0]);
    setDates(dateData);
    setTimes(timeData);
  };

  const addDateTime = (dateTime) => {
    setDateError(false);
    addDate(dateTime);
    const timeData = getTime(dateTime);
    setTimes(timeData);
  };
  const placeOrder = () => {
    setDateError(!pickupTime.date.toString() ? true : false);
    setTimeError(!pickupTime.time.toString() ? true : false);
    setAddressError(!address ? true : false);
    const isTrue = !pickupTime.time.toString() || !pickupTime.date.toString();
    if (isTrue) {
      return null;
    }
    if (!address) {
      return null;
    }
    setTimeout(() => {
      navigation.navigate("OrderScreen");
    }, 500);
    return console.log("Order LIST", pickupTime, address);
  };
  const ScrollViewContainer = styled(ScrollView)`
    margin-top: 56px;
  `;

  React.useEffect(() => {
    setData();
  }, [date, time, address]);

  React.useEffect(() => {
    setPickupTime({ date: date, time: time });
  }, [date, time]);

  return (
    <SafeArea>
      <Header title="Checkout" toLeft={true} navigation={navigation} />
      <ScrollViewContainer>
        <CheckoutContainer>
          <DateTimeContainer>
            <DateContainer>
              <Text variant="checkoutTitle">Select pickup date </Text>
              <DateSelectView>
                {dates.map((d, i) => {
                  const isFocused =
                    d.split(" ")[2] === date.toString().split(" ")[2]
                      ? true
                      : false;
                  return (
                    <TouchableOpacity
                      key={i + 1}
                      onPress={() =>
                        !isFocused ? addDateTime(d) : removeDate(d)
                      }
                    >
                      <DateView
                        key={i + 2}
                        dateData={d}
                        isFocused={isFocused}
                      />
                    </TouchableOpacity>
                  );
                })}
              </DateSelectView>
              {!!dateError && (
                <Spacer position="left" size="medium">
                  <Text variant="error">Please select date</Text>
                </Spacer>
              )}
            </DateContainer>
            <TimeContainer>
              <Text variant="checkoutTitle">Select pickup time</Text>
              <TimeSelectView>
                {times.map((t, i) => {
                  const isFocused = t === time ? true : false;
                  return (
                    <TouchableOpacity
                      key={i}
                      onPress={() =>
                        !isFocused
                          ? (addTime(t), setTimeError(false))
                          : removeTime(t)
                      }
                    >
                      <TimeView key={i} timeData={t} isFocused={isFocused} />
                    </TouchableOpacity>
                  );
                })}
              </TimeSelectView>
              {!!timeError && (
                <Spacer position="left" size="medium">
                  <Text variant="error">Please select time</Text>
                </Spacer>
              )}
            </TimeContainer>
          </DateTimeContainer>
        </CheckoutContainer>

        <AddressContainer>
          <Text variant="checkoutTitle">Address</Text>
          {!address ? (
            <>
              <AddressButton
                mode="contained"
                onPress={() => navigation.navigate("AddressScreen")}
              >
                Add Address
              </AddressButton>
              {!!addressError && (
                <Spacer position="left" size="medium">
                  <Text variant="error">Please add address</Text>
                </Spacer>
              )}
            </>
          ) : (
            <AddressCard navigation={navigation} address={address} />
          )}
        </AddressContainer>
        <BillContainer>
          <Text variant="checkoutTitle">Bill Details</Text>
          <BillCard>
            <View>
              <Text variant="subHead">Service</Text>
              <Text>{servicePlan.title}</Text>
            </View>
            <View>
              <Text variant="subHead">Amount</Text>
              <Spacer position="left">
                <Text>
                  <FontAwesome name="rupee" size={14} color="black" />
                  {` ${servicePlan.price}`}
                </Text>
              </Spacer>
            </View>
          </BillCard>
        </BillContainer>
        <PaymentContainer>
          <CancelButton labelStyle={{ fontSize: 16 }} mode="outlined">
            Cancel
          </CancelButton>
          <Button
            mode="contained"
            labelStyle={{ fontSize: 16 }}
            onPress={() => placeOrder()}
          >
            Place Order
          </Button>
        </PaymentContainer>
      </ScrollViewContainer>
    </SafeArea>
  );
};
