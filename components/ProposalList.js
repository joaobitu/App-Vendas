import React from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import { useState } from "react";
import { Modal, Portal } from "react-native-paper";

export default function ProposalList({ proposalsList }) {
  const [selectedProposal, setSelectedProposal] = useState({});
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  };
  return (
    <View>
      {proposalsList.map((obj) => (
        <List.Item
          title={obj.nome}
          description={(obj.PJ === true && obj.CNPJ) || obj.CPF}
          left={(props) => (
            <List.Icon
              {...props}
              icon={
                obj.termometro <= 30
                  ? "circle-slice-2"
                  : obj.termometro <= 50
                  ? "circle-slice-4"
                  : obj.termometro <= 80
                  ? "circle-slice-6"
                  : "check-circle"
              }
            />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-expand" />}
          onPress={showModal}
        />
      ))}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </View>
  );
}
