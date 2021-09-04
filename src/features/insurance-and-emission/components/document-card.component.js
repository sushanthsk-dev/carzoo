import React from "react";
import styled from "styled-components/native";
import { EvilIcons } from "@expo/vector-icons";
import moment from "moment";
import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { Spacer } from "../../../components/spacer/spacer.component";

const DocumentCardContainer = styled.View`
  margin: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[1]};
`;
const Card = styled.View`
  background-color: ${(props) => props.theme.colors.ui.tertiary};
  padding: ${(props) => props.theme.space[3]};
  margin: ${(props) => props.theme.space[2]};
  border-radius: 4px;
`;

const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Body = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[3]} ${(props) => props.theme.space[1]};
`;
const setDateFormat = (date) => {
  const currentDate = new Date(date);
  const month =
    currentDate.getMonth() < 9
      ? `0${currentDate.getMonth() + 1}`
      : currentDate.getMonth() + 1;

  return `${month}/${currentDate.getDate() - 1}/${currentDate.getFullYear()}`;
};

const differenceBetweenDates = (date) => {
  const currentDate = moment();
  const exDate = moment(new Date(date), "MM/DD/YYYY");
  console.log(currentDate, date);
  //const difference = exDate.getTime() - currentDate.getTime();
  return exDate.diff(currentDate, "days");
  //return Math.ceil(difference / (1000 * 60 * 60 * 24));
};
export const InsuranceDocumentCard = ({ navigation, insuranceDocument }) => {
  const remainingExpiryDate = differenceBetweenDates(
    insuranceDocument.expiryDate
  );
  return (
    <DocumentCardContainer>
      <Card>
        <Title>
          <Text>{insuranceDocument.insuranceCompanyName}</Text>
          <EvilIcons
            name="pencil"
            size={28}
            color="green"
            onPress={() =>
              navigation.navigate("AddDocumentScreen", { insurance: true })
            }
          />
        </Title>
        <Spacer size="large">
          <Text variant="light_text">Policy No</Text>
          <Text variant="subHead">{insuranceDocument.policyNo}</Text>
        </Spacer>
        <Body>
          <View>
            <Text variant="light_text">Insured's Name</Text>
            <Text variant="subHead">{insuranceDocument.insuredName}</Text>
          </View>
          <Spacer position="right" size="larger">
            <Text variant="light_text">Expiry date</Text>
            <Text variant="subHead">
              {setDateFormat(insuranceDocument.expiryDate)}
            </Text>
          </Spacer>
        </Body>
      </Card>
      <Spacer position="left" size="medium">
        {remainingExpiryDate > 0 ? (
          <Text variant="error">
            {`Your insurance document will expire in ${differenceBetweenDates(
              insuranceDocument.expiryDate
            )}days`}
          </Text>
        ) : (
          <Text variant="error">Your insurance document expired</Text>
        )}
      </Spacer>
    </DocumentCardContainer>
  );
};

export const EmissionDocumentCard = ({ navigation, emissionDocument }) => {
  const remainingExpiryDate = differenceBetweenDates(
    emissionDocument.expiryDate
  );
  return (
    <DocumentCardContainer>
      <Card>
        <Title>
          <Text>Emission Test </Text>
          <EvilIcons
            name="pencil"
            size={28}
            color="green"
            onPress={() =>
              navigation.navigate("AddDocumentScreen", { insurance: false })
            }
          />
        </Title>
        <Spacer size="large">
          <Text variant="light_text">Pucc No</Text>
          <Text variant="subHead">{emissionDocument.puucNo}</Text>
        </Spacer>
        <Body>
          <View>
            <Text variant="light_text">Customer's Name</Text>
            <Text variant="subHead">{emissionDocument.customerName}</Text>
          </View>
          <Spacer position="right" size="larger">
            <Text variant="light_text">Expiry date</Text>
            <Text variant="subHead">
              {setDateFormat(emissionDocument.expiryDate)}
            </Text>
          </Spacer>
        </Body>
      </Card>
      <Spacer position="left" size="medium">
        {remainingExpiryDate > 0 ? (
          <Text variant="error">
            {`Your emission document will expire in ${differenceBetweenDates(
              emissionDocument.expiryDate
            )}days`}
          </Text>
        ) : (
          <Text variant="error">Your emission document expired</Text>
        )}
      </Spacer>
    </DocumentCardContainer>
  );
};
