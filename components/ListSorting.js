import React from "react";
import { View, Text } from "react-native";
import {
  Searchbar,
  Chip,
  SegmentedButtons,
  Modal,
  Portal,
  Button,
  Switch,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { useState, useEffect } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ListSortingAndFiltering = ({ submitSortedVersion, proposalsList }) => {
  // Sort the data array in-place using the sortKey
  const searchList = ["Nome", "Email", "Telefone"];
  const [sorting, setSorting] = useState("");
  const [filters, setFilters] = useState([]);
  const [isPJ, setIsPJ] = useState(true);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  };

  const [selectedSearch, setSelectedSearch] = useState("");

  const addToFilters = (filter) => {
    const newFilters = [...filters];
    newFilters.push(filter);
    setFilters(newFilters);
  };

  const removeFromFilters = (filter) => {
    const newFiltersList = filters.filter((obj) => obj !== filter);
    setFilters(newFiltersList);
  };

  const sortProposals = (sorting, PJ, filtersArray) => {
    let sortedVersion = [...proposalsList];
    switch (sorting) {
      case sorting == "quentes":
        sortedVersion.sort((a, b) => b.termometro - a.termometro);
        break;
      case sorting == "novas":
        sortedVersion.sort((a, b) => a.criadoEm - b.criadoEm);
        break;
    }
    if (PJ) {
      sortedVersion = sortedVersion.filter((obj) => obj.PJ === true);
    } else {
      sortedVersion = sortedVersion.filter((obj) => obj.PJ !== true);
    }
    filtersArray.map((obj) => {
      if (obj === "Apenas Goiânia") {
        sortedVersion = sortedVersion.filter(
          (obj) => obj.detalhesEndereco?.logradouro === "Goiânia"
        );
      }
      if (obj === "Termômetro > 50") {
        sortedVersion = sortedVersion.filter((obj) => obj.termometro >= 50);
      }
    });
    submitSortedVersion(sortedVersion);
  };

  useEffect(() => {
    sortProposals(sorting, isPJ, filters);
  }, [sorting, isPJ, filters]);

  return (
    <View>
      <View style={{ flexDirection: "row", marginHorizontal: -20 }}>
        <Searchbar placeholder={`Busque pelo`} style={{ width: "65%" }} />

        <SelectDropdown
          defaultButtonText={"Nome"}
          buttonStyle={{
            width: "35%",
            backgroundColor: "#f9f2fa",

            borderRadius: 2,
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#2c262d"}
                size={18}
              />
            );
          }}
          data={searchList}
          onSelect={(selectedItem) => {
            setSelectedSearch(selectedItem);
          }}
        />
      </View>
      <Button
        style={{ marginTop: 10, alignSelf: "flex-start" }}
        onPress={showModal}
      >
        Opções Adicionais
      </Button>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <SegmentedButtons
            style={{ marginVertical: 10 }}
            value={sorting}
            onValueChange={setSorting}
            buttons={[
              {
                value: "quentes",
                label: "Quentes",
                icon: "trending-up",
              },
              {
                value: "novas",
                label: "Novas",
                icon: "new-box",
              },
            ]}
          />
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            {(isPJ && <Text>PJ</Text>) || <Text>PF</Text>}
            <Switch value={isPJ} onChange={() => setIsPJ(!isPJ)} />
          </View>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            <Chip
              style={{ margin: 2 }}
              selected={filters.indexOf("Termômetro > 50") !== -1}
              onPress={() => {
                filters.indexOf("Termômetro > 50") === -1
                  ? addToFilters("Termômetro > 50")
                  : removeFromFilters("Termômetro > 50");
              }}
            >
              {"Termômetro > 50"}
            </Chip>
            <Chip
              style={{ margin: 2 }}
              selected={filters.indexOf("Apenas Goiânia") !== -1}
              onPress={() => {
                filters.indexOf("Apenas Goiânia") === -1
                  ? addToFilters("Apenas Goiânia")
                  : removeFromFilters("Apenas Goiânia");
              }}
            >
              {"Apenas Goiânia"}
            </Chip>
          </View>
        </Modal>
      </Portal>
    </View>
  );
};

export default ListSortingAndFiltering;
