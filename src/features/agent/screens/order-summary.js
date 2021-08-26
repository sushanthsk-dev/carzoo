import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { Header } from "../../../components/header/header.component";
import { LoadingDiv } from "../../../components/loading/loading.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { PriceText } from "../../../components/typography/price-text.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AddressContext } from "../../../services/address/address.context";
import { AddressCard } from "../../cart/components/address-card.component";
import { AgentCard } from "../../profile/components/agent-card.component";
import { ServiceStatus } from "../../profile/components/service-status.component";

const OrderContainer = styled(ScrollView)`
  margin: 0 ${(props) => props.theme.space[2]};
  margin-top: 70px;
`;

const OrderCard = styled.View`
  margin: ${(props) => props.theme.space[1]};
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  border-radius: 5px;
`;

const Section = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.space[1]};
`;

const SpacerView = styled.View`
  margin: ${(props) => props.theme.space[1]};
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const ServiceStatusContainer = styled.View`
  margin: ${(props) => props.theme.space[2]};
`;
const ServiceAgentDetails = styled.View`
  margin: ${(props) => props.theme.space[1]};
`;
export const AgentOrderSummaryScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const { serviceOrder } = route.params;
  const orderCreatedAt = new Date(serviceOrder.createdAt);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  });
  return (
    <SafeArea>
      {isLoading ? (
        <LoadingDiv />
      ) : serviceOrder !== null ? (
        <>
          <Header toLeft={true} navigation={navigation} title="Order Summary" />
          <OrderContainer showsVerticalScrollIndicator={false}>
            <OrderCard>
              <Section>
                <Text variant="title">{serviceOrder.servicePlan}</Text>
                <Text variant="caption">{`ID : ${serviceOrder.orderId}`}</Text>
              </Section>
              <Spacer position="left" size="medium">
                <PriceText price={serviceOrder.price} />
              </Spacer>
              <Spacer size="large">
                <SpacerView>
                  <Text variant="label">Car model : </Text>
                  <Text variant="subHead">
                    {serviceOrder.carDetails.carModel}
                  </Text>
                </SpacerView>
                <SpacerView>
                  <Text variant="label">Reg no : </Text>
                  <Text variant="subHead">
                    {serviceOrder.carDetails.registrationNo}
                  </Text>
                </SpacerView>
              </Spacer>
            </OrderCard>
            <Spacer position="top" size="medium" />
            <Spacer position="left" size="medium">
              <Text variant="label">{`Service Ordered on ${orderCreatedAt.toDateString()}`}</Text>
            </Spacer>
            <Spacer position="top" size="large">
              <Spacer position="left" size="medium">
                <Text variant="subHead">Pickup Address</Text>
              </Spacer>
              <Spacer position="bottom" size="medium" />
              <AddressCard
                edit={false}
                address={{
                  ...serviceOrder.user.address,
                  phoneno: serviceOrder.user.phoneno,
                  name: serviceOrder.user.name,
                }}
              />
            </Spacer>
            <ServiceStatusContainer>
              <Text variant="subHead">Service Status</Text>
              <ServiceStatus orderStatus={serviceOrder.orderStatus} />
            </ServiceStatusContainer>
            {!!serviceOrder.agent && (
              <ServiceAgentDetails>
                <Text variant="subHead">Assigned to</Text>
                <AgentCard agent={serviceOrder.agent} />
              </ServiceAgentDetails>
            )}
          </OrderContainer>
        </>
      ) : (
        <LoadingDiv />
      )}
    </SafeArea>
  );
};
