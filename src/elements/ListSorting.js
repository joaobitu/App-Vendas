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

const ListSortingAndFiltering = ({ sortAndFilter }) => {
  // Sort the data array in-place using the sortKey
  const searchList = ["Nome", "Email", "Telefone"];

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  };

  const addToFilters = (filter) => {
    const newFilters = [...sortAndFilter.filters];
    newFilters.push(filter);
    sortAndFilter.setFilters(newFilters);
  };

  const removeFromFilters = (filter) => {
    const newFiltersList = sortAndFilter.filters.filter(
      (obj) => obj !== filter
    );
    sortAndFilter.setFilters(newFiltersList);
  };

  return (
    <View>
      <View style={{ flexDirection: "row", marginHorizontal: -20 }}>
        <Searchbar
          placeholder={`Busque pelo`}
          style={{ width: "65%" }}
          onChangeText={(text) => sortAndFilter.setTextValue(text)}
        />

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
            sortAndFilter.setSelectedSearch(selectedItem);
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
            value={sortAndFilter.sorting}
            onValueChange={sortAndFilter.setSorting}
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
            {(sortAndFilter.isPJ && <Text>PJ</Text>) || <Text>PF</Text>}
            <Switch
              value={sortAndFilter.isPJ}
              onChange={() => sortAndFilter.setIsPJ(!sortAndFilter.isPJ)}
            />
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
              selected={sortAndFilter.filters.indexOf("Termômetro > 50") !== -1}
              onPress={() => {
                sortAndFilter.filters.indexOf("Termômetro > 50") === -1
                  ? addToFilters("Termômetro > 50")
                  : removeFromFilters("Termômetro > 50");
              }}
            >
              {"Termômetro > 50"}
            </Chip>
            <Chip
              style={{ margin: 2 }}
              selected={sortAndFilter.filters.indexOf("Apenas Goiânia") !== -1}
              onPress={() => {
                sortAndFilter.filters.indexOf("Apenas Goiânia") === -1
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
