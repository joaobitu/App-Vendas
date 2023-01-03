import React from "react";

import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { FAB, Portal, Modal } from "react-native-paper";
import { useState, useEffect } from "react";
import ListSortingAndFiltering from "../components/ListSorting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SalesMap from "../components/SalesMap";

import { useProposals } from "../hooks/ProposalProvider";

import ProposalList from "../components/ProposalList";

export default function Homepage({ navigation }) {
  const { proposals, setProposals } = useProposals();

  const [sorting, setSorting] = useState("novas");
  const [filters, setFilters] = useState([]);
  const [isPJ, setIsPJ] = useState(true);
  const [selectedSearch, setSelectedSearch] = useState("Nome");
  const [textValue, setTextValue] = useState("");

  const [sortedList, setSortedList] = useState([]);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(`${value}`, jsonValue);
    } catch (e) {
      return e.message;
    }
  };
  const getData = async (value) => {
    try {
      const jsonValue = await AsyncStorage.getItem(`${value}`);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };
  const sortProposals = (
    sortingChoice,
    PJ,
    filtersArray,
    searchText,
    searchOption
  ) => {
    let sortedVersion = [...proposals];

    //filtering between PJ and PF
    if (PJ) {
      sortedVersion = sortedVersion.filter((obj) => obj.PJ === true);
    } else {
      sortedVersion = sortedVersion.filter((obj) => obj.PJ !== true);
    }

    filtersArray?.map((obj) => {
      if (obj === "Apenas Goiânia") {
        sortedVersion = sortedVersion.filter(
          (obj) => obj.detalhesEndereco?.logradouro === "Goiânia"
        );
      } else if (obj === "Termômetro > 50") {
        sortedVersion = sortedVersion.filter((obj) => obj.termometro >= 50);
      }
    });
    // sorting between quentes or novos
    if (sortingChoice == "quentes") {
      sortedVersion.sort((a, b) => b.termometro - a.termometro);
    } else {
      sortedVersion.sort((a, b) => {
        a.criadoEm - b.criadoEm;
      });
    }

    if (searchOption === "Nome") {
      sortedVersion = sortedVersion.filter((obj) =>
        obj?.nome.startsWith(searchText)
      );
    } else if (searchOption === "Telefone") {
      sortedVersion = sortedVersion.filter((obj) =>
        obj?.telefone.replace(/\D/g, "").startsWith(searchText)
      );
    } else {
      sortedVersion = sortedVersion.filter((obj) =>
        obj?.email.startsWith(searchText)
      );
    }
    return sortedVersion;
  };

  useEffect(() => {
    const getDataAsync = async () => {
      const data = await getData("proposals");

      setProposals(data);
    };
    getDataAsync();
  }, []);

  useEffect(() => {
    storeData(proposals);
    setSortedList(
      sortProposals(sorting, isPJ, filters, textValue, selectedSearch)
    );
  }, [proposals, sorting, filters, isPJ, selectedSearch, textValue]);

  return (
    <View style={styles.container}>
      <ListSortingAndFiltering
        submitSortedVersion={sortProposals}
        sortAndFilter={{
          sorting,
          setSorting,
          filters,
          setFilters,
          isPJ,
          setIsPJ,
          selectedSearch,
          setSelectedSearch,
          textValue,
          setTextValue,
        }}
      />

      <ProposalList sortedProposals={sortedList} />

      <KeyboardAvoidingView style={styles.bottomSection}>
        <FAB
          icon="plus"
          accessibilityLabel="Nova Proposta"
          onPress={() => navigation.navigate("Nova Proposta")}
        />
        <FAB icon="chart-bar" accessibilityLabel="Dados" onPress={showModal} />
      </KeyboardAvoidingView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <SalesMap />
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },

  bottomSection: {
    position: "absolute",

    bottom: 50,
    right: 20,
    flexDirection: "row-reverse",
    width: "100%",
    justifyContent: "space-between",
  },
});
