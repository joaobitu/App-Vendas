import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { Appbar, TextInput, List, Switch, DataTable } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { useState } from "react";

//pegando as dimensões da tela para implementar correntamente o modal
const screenDimensions = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

const NewProposalModal = (props) => {
  const [CNPJ, setCNPJ] = useState("");
  const [CPF, setCPF] = useState("");
  const [CEP, setCEP] = useState("");
  const [PJ, setPJ] = useState(true);
  const [error, setError] = useState("");

  const [detalhesEmpresa, setDetalhesEmpresa] = useState({});
  const [detalhesEndereco, setDetalhesEndereco] = useState({});

  const getCEPData = async (cep) => {
    const cleanCEP = cep.replace(/\D/g, "");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCEP}/json/`
      );
      if (response.ok) {
        const data = await response.json();
        setDetalhesEndereco(data);
      } else {
        throw new Error(`Request failed: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const getCNPJData = async (cnpj) => {
    const cleanCNPJ = cnpj.replace(/\D/g, "");

    try {
      const response = await fetch(
        `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cleanCNPJ}`
      );
      if (response.ok) {
        const data = await response.json();
        setDetalhesEmpresa(data);
      } else {
        throw new Error(`Request failed: ${response.statusText}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (CNPJ.length === 18) {
      getCNPJData(CNPJ);
    }
    if (CEP.length === 9) {
      getCEPData(CEP);
    }
  }, [CNPJ, CEP]);

  return (
    <View style={styles.container}>
      <Appbar.Header elevated="true">
        <Appbar.BackAction onPress={() => props.leave(false)} />
        <Appbar.Content title="Nova Proposta" />
      </Appbar.Header>
      <Text>{error}</Text>
      <KeyboardAvoidingView style={styles.formArea}>
        <View style={styles.toggle}>
          {(PJ && <Text>PJ</Text>) || <Text>PF</Text>}
          <Switch value={PJ} onChange={() => setPJ(!PJ)} />
        </View>

        {(PJ && (
          <View>
            <TextInput
              mode="outlined"
              label="CNPJ"
              value={CNPJ}
              onChangeText={(text) => setCNPJ(text)}
              render={(props) => (
                <TextInputMask
                  style={styles.masked}
                  type={"cnpj"}
                  value={CNPJ}
                  onChangeText={(text) => {
                    setCNPJ(text);
                  }}
                />
              )}
            />
            <List.Accordion
              title="Detalhes da Empresa"
              left={(props) => <List.Icon {...props} icon="folder" />}
            >
              <List.Item
                title="Nome Fantasia"
                description={detalhesEmpresa["NOME FANTASIA"]}
                descriptionNumberOfLines={6}
              />
              <List.Item
                title="Razão Social"
                description={detalhesEmpresa["RAZAO SOCIAL"]}
                descriptionNumberOfLines={6}
              />
              <List.Item
                title="Status"
                description={detalhesEmpresa.STATUS}
                descriptionNumberOfLines={6}
              />
              <List.Item
                title="CNAE"
                description={detalhesEmpresa["CNAE PRINCIPAL DESCRICAO"]}
                descriptionNumberOfLines={6}
              />
            </List.Accordion>
          </View>
        )) || (
          <TextInput
            mode="outlined"
            label="CPF"
            value={CPF}
            onChangeText={(text) => setCPF(text)}
            render={(props) => (
              <TextInputMask
                style={styles.masked}
                type={"cpf"}
                value={CPF}
                onChangeText={(text) => {
                  setCPF(text);
                }}
              />
            )}
          />
        )}
        <TextInput
          mode="outlined"
          label="CEP"
          value={CEP}
          onChangeText={(text) => setCEP(text)}
          render={(props) => (
            <TextInputMask
              style={styles.masked}
              type={"zip-code"}
              value={CEP}
              onChangeText={(text) => {
                setCEP(text);
              }}
            />
          )}
        />
        <List.Accordion
          title="Detalhes do Endereço"
          left={(props) => <List.Icon {...props} icon="folder" />}
        >
          <List.Item
            title="Unidade Federativa"
            description={detalhesEndereco.uf} //{71928720}
            descriptionNumberOfLines={6}
          />
          <List.Item
            title="Cidade"
            description={detalhesEndereco.localidade}
            descriptionNumberOfLines={6}
          />
          <List.Item
            title="Bairro"
            description={detalhesEndereco.bairro}
            descriptionNumberOfLines={6}
          />
          <List.Item
            title="Rua"
            description={detalhesEndereco.logradouro}
            descriptionNumberOfLines={6}
          />
        </List.Accordion>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",

    flexDirection: "column",
    top: 0,
    width: screenDimensions.width,
    height: screenDimensions.height,
    backgroundColor: "#fff",
  },
  formArea: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    gap: 5,
  },
  masked: {
    marginLeft: 15,
    marginTop: 10,
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NewProposalModal;
