import React from "react";
import { View, StyleSheet, ScrollView, TextInput, Linking } from "react-native";

import { useState } from "react";
import { Modal, Portal, Text, List, FAB, Divider } from "react-native-paper";
import { useProposals } from "./ProposalProvider";

export default function ProposalList({ sortedProposals }) {
  const [selectedProposal, setSelectedProposal] = useState({});
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newTelefone, setNewTelefone] = useState("");
  const [newLogradouro, setNewLogradouro] = useState("");
  const [pagination, setPagination] = useState(1);

  const { proposals, setProposals } = useProposals();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const deleteProposal = (proposal) => {
    const newProposalsList = proposals.filter(
      (obj) => obj.key !== proposal.key
    );
    setProposals(newProposalsList);
  };
  const editComplete = () => {
    const newProposalsList = [...proposals];

    newProposalsList[selectedProposal.key - 1].detalhesEndereco.logradouro =
      newLogradouro;
    newProposalsList[selectedProposal.key - 1].telefone = newTelefone;
    newProposalsList[selectedProposal.key - 1].email = newEmail;
    setProposals(newProposalsList);
  };
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  };
  return (
    <ScrollView style={{ marginBottom: 60 }}>
      {sortedProposals.slice(0, 3 * pagination).map((obj, index) => (
        <View>
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
          <Divider key={index + 1} />
        </View>
      ))}
      {sortedProposals.length > 3 * pagination && (
        <FAB
          style={{ alignSelf: "center", marginVertical: 10 }}
          label="Carregar Mais"
          onPress={() => setPagination(pagination + 1)}
        />
      )}

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
                Razão Social: {selectedProposal.detalhesEmpresa["RAZAO SOCIAL"]}
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
              onPress={() =>
                Linking.openURL(
                  `mailto:${selectedProposal.email}?subject=Ol%C3%A1%2C%20aqui%20%C3%A9%20o%20Daniel%20da%20UnyPax%21&body=%0AGostaria%20de%20Informar%20que%20contratamos%20um%20novo%20desenvolvedor%20mobile%21%20O%20nome%20dele%20%C3%A9%20Jo%C3%A3o%21%20o%20cara%20se%20garante%20demais%2C%20ent%C3%A3o%20n%C3%B3s%20estamos%20expandido%20nossos%20produtos%20com%20uma%20linha%20de%20aplicativos%20para%20celular%20que%20v%C3%A3o%20potencializar%20ainda%20mais%20a%20tua%20parceiria%20consco%2C%20valeu%21%0AQualquer%20coisa%20me%20liga%20no%3A%20%2862%29%2098148-6032.`
                )
              }
            />
            <FAB
              icon="whatsapp"
              style={styles.fab}
              onPress={() =>
                Linking.openURL(
                  `https://wa.me/55${selectedProposal.telefone.replace(
                    /\D/g,
                    ""
                  )}/?text=%0AGostaria%20de%20Informar%20que%20contratamos%20um%20novo%20desenvolvedor%20mobile%21%20O%20nome%20dele%20%C3%A9%20Jo%C3%A3o%21%20o%20cara%20se%20garante%20demais%2C%20ent%C3%A3o%20n%C3%B3s%20estamos%20expandido%20nossos%20produtos%20com%20uma%20linha%20de%20aplicativos%20para%20celular%20que%20v%C3%A3o%20potencializar%20ainda%20mais%20a%20tua%20parceiria%20consco%2C%20valeu%21%0AQualquer%20coisa%20%C3%A9%20s%C3%B3%20responder%20a%20mensagem%21.`
                )
              }
            />
          </View>
        </Modal>
      </Portal>
    </ScrollView>
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
