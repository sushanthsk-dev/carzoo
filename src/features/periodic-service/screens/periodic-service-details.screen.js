import React, { useContext } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Carousel } from "../../../components/carousel/carousel.component";
import { CartContext } from "../../../services/Cart/cart.context";
import { CartFloat } from "../../../components/cart/cart-float.component";
import { AddCart } from "../../../components/cart/add-cart.component";
import { Header } from "../../../components/header/header.component";
import { PriceText } from "../../../components/typography/price-text.component";

const PeriodicServiceDetailsTopContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const PeriodicServiceDetailsContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
`;

const ImageCarousel = styled.View`
  width: 100%;
  height: 200px;
  margin-top: 50px;
  background-color: grey;
`;

const SectionRight = styled.View`
  flex: 1;
  justify-content: flex-end;
  flex-direction: row;
  justify-content: flex-end;
`;

const SpacerView = styled.View`
  margin-top: ${(props) => props.theme.space[1]};
  flex-direction: row;
  text-align: center;
  align-items: center;
`;

const ServiceSpacer = styled.View`
  margin-left: ${(props) => props.theme.space[4]};

  margin-top: ${(props) => props.theme.space[1]};
  flex-direction: row;
`;

const PeriodicServiceScrollView = styled(ScrollView)`
  margin-bottom: 50px;
`;

export const PeriodicServiceDetails = ({ route, navigation }) => {
  const { cart, addCart, removeCart } = useContext(CartContext);

  const { servicePlan } = route.params;

  const images = [
    "https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    "https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  ];

  return (
    <SafeArea>
      <Header title={servicePlan.title} toLeft={true} navigation={navigation} />
      <PeriodicServiceScrollView>
        <ImageCarousel>
          <Carousel images={images} />
        </ImageCarousel>
        <PeriodicServiceDetailsTopContainer>
          <Spacer position="none">
            <Text variant="title">Basic Service</Text>
          </Spacer>
          <SectionRight>
            <PriceText price={servicePlan.price} />
          </SectionRight>
          <Spacer size="larger">
            <AddCart servicePlan={servicePlan} textComponent />
          </Spacer>
        </PeriodicServiceDetailsTopContainer>

        <PeriodicServiceDetailsContainer>
          <SpacerView>
            <FontAwesome name="square" size={16} color="black" />
            <Spacer position="bottom" size="small">
              <Text variant="body">{` ${servicePlan.features[0]}`}</Text>
            </Spacer>
          </SpacerView>
          <SpacerView>
            <FontAwesome name="square" size={16} color="black" />
            <Spacer position="bottom" size="small">
              <Text variant="body">{` ${servicePlan.features[1]}`}</Text>
            </Spacer>
          </SpacerView>
          <SpacerView>
            <FontAwesome name="square" size={16} color="black" />
            <Text variant="body">{` ${servicePlan.features[2]}`}</Text>
          </SpacerView>
          {servicePlan.services.map((s, i) => (
            <ServiceSpacer key={i}>
              <Entypo name="dot-single" size={24} color="black" />
              <Text variant="body">{s}</Text>
            </ServiceSpacer>
          ))}
        </PeriodicServiceDetailsContainer>
      </PeriodicServiceScrollView>
      {!!cart.id && <CartFloat navigation={navigation} />}
    </SafeArea>
  );
};
