import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { useProposals } from "./ProposalProvider";
import { useState } from "react";

const SalesMap = () => {
  const { proposals, setProposals } = useProposals();
  const [pagination, setPagination] = useState(1);

  const orderByTemp = (array) => {
    const sortedVersion = array;
    sortedVersion.sort((a, b) => b.termometro - a.termometro);
    return sortedVersion;
  };
  return (
    <View>
      <Text>Contatos Quentes!</Text>
      <View>
        {orderByTemp(proposals)
          .slice(0 + 5 * (pagination - 1), 5 * pagination)
          .map((obj, index) => (
            <View>
              <Text>
                {5 * (pagination - 1) + index + 1}: {obj.email}, {obj.telefone}
              </Text>
              <View
                style={{
                  height: 10,
                  width: `${obj.termometro}%`,
                  backgroundColor: "#eaddff",
                }}
              ></View>
            </View>
          ))}
      </View>
      <View style={{ flexDirection: "row", alignSelf: "center", margin: 20 }}>
        <FAB
          icon="chevron-left"
          accessibilityLabel="Nova Proposta"
          disabled={pagination === 1 ? true : false}
          onPress={() => {
            setPagination(pagination - 1);
          }}
        />
        <FAB
          icon="chevron-right"
          accessibilityLabel="Nova Proposta"
          disabled={pagination * 5 > proposals.length ? true : false}
          onPress={() => {
            setPagination(pagination + 1);
          }}
        />
      </View>
    </View>
  );
};

export default SalesMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
