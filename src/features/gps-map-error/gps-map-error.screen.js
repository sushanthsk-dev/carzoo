import React from "react";
import { StyleSheet, Modal, View } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import { Spacer } from "../../components/spacer/spacer.component";
import { Text } from "../../components/typography/text.component";
import { SafeArea } from "../../components/utility/safe-area.component";

const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ImageContainer = styled.Image`
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
  resize-mode: contain;
`;

export const GPSMapErrorScreen = ({ errorMsg, grantGPS }) => (
  <Modal style={styles.modal} animationInTiming={600}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {errorMsg !== null
          ? "GPS Location Required"
          : "Location access permission is required"}
      </Text>
      <Text style={styles.modalText}>
        {errorMsg !== null
          ? "Oops! Looks like your GPS location is not connected."
          : errorMsg}
      </Text>
      <Button onPress={grantGPS}>Grant location permission</Button>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  // ...
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  modalText: {
    fontSize: 18,
    color: "#555",
    marginTop: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});
