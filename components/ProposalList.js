import React from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";

import { useState } from "react";
import { Modal, Portal, Text, List, FAB } from "react-native-paper";

export default function ProposalList({ proposalsList, modifyProposalsList }) {
  const [selectedProposal, setSelectedProposal] = useState({});
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newTelefone, setNewTelefone] = useState("");
  const [newLogradouro, setNewLogradouro] = useState("");

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const deleteProposal = (proposal) => {
    const newProposalsList = proposalsList.filter(
      (obj) => obj.key !== proposal.key
    );
    modifyProposalsList(newProposalsList);
  };
  const editComplete = () => {
    const newProposalsList = [...proposalsList];

    newProposalsList[selectedProposal.key - 1].detalhesEndereco.logradouro =
      newLogradouro;
    newProposalsList[selectedProposal.key - 1].telefone = newTelefone;
    newProposalsList[selectedProposal.key - 1].email = newEmail;
    modifyProposalsList(newProposalsList);
  };
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  };
  return (
    <View>
      {proposalsList.map((obj, index) => (
        <List.Item
          key={index}
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
          onPress={() => {
            setSelectedProposal(obj);
            showModal();
          }}
        />
      ))}
      <ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text variant="headlineSmall">
              {(selectedProposal.PJ && "Empresa") || "Pessoa Física"}
            </Text>
            <Text>
              {(!selectedProposal.PJ && `CPF: ${selectedProposal.CPF}`) ||
                `CNPJ: ${selectedProposal.CNPJ}`}
            </Text>
            {selectedProposal.PJ && (
              <View>
                <Text>
                  Nome Fantasia:{" "}
                  {selectedProposal.detalhesEmpresa["NOME FANTASIA"]}
                </Text>
                <Text>
                  Razão Social:{" "}
                  {selectedProposal.detalhesEmpresa["RAZAO SOCIAL"]}
                </Text>
                <Text>Status: {selectedProposal.detalhesEmpresa.STATUS}</Text>
                <Text>
                  CNAE:{" "}
                  {selectedProposal.detalhesEmpresa["CNAE PRINCIPAL DESCRICAO"]}{" "}
                  código:{" "}
                  {selectedProposal.detalhesEmpresa["CNAE PRINCIPAL CODIGO"]}
                </Text>
                <View></View>
              </View>
            )}
            <Text>Nome: {selectedProposal.nome}</Text>
            <View style={styles.editableData}>
              <Text>Email: </Text>
              {(!edit && <Text>{selectedProposal.email}</Text>) || (
                <TextInput
                  style={styles.editableInput}
                  defaultValue={selectedProposal.email}
                  onChangeText={(text) => {
                    setNewEmail(text);
                  }}
                />
              )}
            </View>

            <View style={styles.editableData}>
              <Text>Telefone: </Text>
              {(!edit && <Text>{selectedProposal.telefone}</Text>) || (
                <TextInput
                  style={styles.editableInput}
                  defaultValue={selectedProposal.telefone}
                  onChangeText={(text) => {
                    setNewTelefone(text);
                  }}
                />
              )}
            </View>
            <Text>CEP: {selectedProposal.CEP}</Text>
            <Text>UF: {selectedProposal.detalhesEndereco?.uf}</Text>
            <Text>Cidade: {selectedProposal.detalhesEndereco?.localidade}</Text>
            <Text>Bairro: {selectedProposal.detalhesEndereco?.bairro}</Text>

            <View style={styles.editableData}>
              <Text>Logradouro: </Text>
              {(!edit && (
                <Text>{selectedProposal.detalhesEndereco?.logradouro}</Text>
              )) || (
                <TextInput
                  style={styles.editableInput}
                  defaultValue={selectedProposal.detalhesEndereco?.logradouro}
                  onChangeText={(text) => setNewLogradouro(text)}
                />
              )}
            </View>
            <Text>Complemento: {selectedProposal.complemento}</Text>
            <Text>
              Data da Proposta: {JSON.stringify(selectedProposal.criadoEm)}
            </Text>
            <Text>Termômetro: {selectedProposal.termometro}%</Text>
            <View style={styles.icones}>
              <FAB
                icon={(!edit && "pencil") || "check"}
                style={styles.fab}
                onPress={() => {
                  editComplete();
                  setEdit(!edit);
                }}
              />
              <FAB
                icon="trash-can"
                style={styles.fab}
                onPress={() => {
                  setVisible(!visible);
                  deleteProposal(selectedProposal);
                }}
              />
              <FAB
                icon="email"
                style={styles.fab}
                onPress={() => console.log("Pressed")}
              />
              <FAB
                icon="whatsapp"
                style={styles.fab}
                onPress={() => console.log("Pressed")}
              />
            </View>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  icones: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fab: {
    marginHorizontal: 5,
  },
  editableData: {
    flexDirection: "row",
  },
  editableInput: {
    backgroundColor: "#eaddff",
    paddingHorizontal: 5,
    borderRadius: 20,
  },
});
