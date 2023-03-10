import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, List, Switch, Divider, FAB } from "react-native-paper";
import { TextInputMask } from "react-native-masked-text";
import { useState } from "react";
import Slider from "@react-native-community/slider";
import { useProposals } from "../hooks/ProposalProvider";

//pegando as dimensões da tela para implementar correntamente o modal
const screenDimensions = {
  height: Dimensions.get("window").height,
  width: Dimensions.get("window").width,
};

const NewProposalModal = ({ route, navigation }) => {
  const [CNPJ, setCNPJ] = useState("");
  const [CPF, setCPF] = useState("");
  const [CEP, setCEP] = useState("");
  const [PJ, setPJ] = useState(true);
  const [error, setError] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [complemento, setComplemento] = useState("");
  const [termometro, setTermometro] = useState(0);
  const [detalhesEmpresa, setDetalhesEmpresa] = useState({});
  const [detalhesEndereco, setDetalhesEndereco] = useState({});

  const { proposals, setProposals } = useProposals();

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
        throw new Error(`Request failed: ${response.status}`);
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
      <Text>{error}</Text>

      <KeyboardAvoidingView style={{ paddingBottom: 120 }}>
        <ScrollView style={styles.formArea}>
          <TextInput
            mode="outlined"
            label="Nome"
            value={nome}
            onChangeText={(text) => setNome(text)}
          />
          <TextInput
            mode="outlined"
            label="Telefone"
            value={telefone}
            onChangeText={(text) => setTelefone(text)}
            render={(props) => (
              <TextInputMask
                style={styles.masked}
                type={"cel-phone"}
                value={telefone}
                onChangeText={(text) => {
                  setTelefone(text);
                }}
              />
            )}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            mode="outlined"
            label="CEP"
            value={CEP}
            onChangeText={(text) => {
              setCEP(text);
            }}
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
          {CEP.length === 9 && (
            <List.Accordion
              title="Detalhes do Endereço"
              left={(props) => <List.Icon {...props} icon="map-check" />}
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
          )}
          <TextInput
            mode="outlined"
            label="Complemento(Incluir número)"
            value={complemento}
            onChangeText={(text) => setComplemento(text)}
          />
          <Divider style={{ marginVertical: 10 }} />
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
              {CNPJ.length === 18 && (
                <List.Accordion
                  title="Detalhes da Empresa"
                  left={(props) => (
                    <List.Icon {...props} icon="office-building" />
                  )}
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
              )}
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
          <Divider style={{ marginVertical: 10 }} />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 100,
            }}
          >
            <Text>Termômetro da Venda</Text>
            <Slider
              style={{ flex: 1, minWidth: "100%" }}
              minimumValue={0}
              maximumValue={100}
              step={10}
              onSlidingComplete={(value) => setTermometro(value)}
            />
            <Text>{termometro}%</Text>
          </View>
          <FAB
            icon="check"
            accessibilityLabel="Nova Proposta"
            style={styles.bottomSection}
            onPress={() => {
              setProposals([
                ...proposals,
                {
                  CEP,
                  CNPJ,
                  CPF,
                  PJ,
                  nome,
                  telefone,
                  email,
                  complemento,
                  termometro,
                  detalhesEmpresa,
                  detalhesEndereco,
                  criadoEm: new Date(),
                  key: proposals.length + 1,
                },
              ]);
              navigation.navigate("Propostas");
            }}
          />
        </ScrollView>
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
    paddingHorizontal: 20,
    flexDirection: "column",
  },
  masked: {
    marginLeft: 15,
    marginTop: 10,
  },
  bottomSection: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default NewProposalModal;
