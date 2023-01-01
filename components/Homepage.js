import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { useState, useEffect } from "react";
import ListSortingAndFiltering from "./ListSorting";

import ProposalList from "./ProposalList";

export default function Homepage({ navigation }) {
  const [proposals, setProposals] = useState([]);
  const [sortedProposals, setSortedProposals] = useState([]);

  return (
    <View style={styles.container}>
      <ListSortingAndFiltering
        submitSortedVersion={setSortedProposals}
        proposalsList={proposals}
      />
      <ProposalList
        proposalsList={proposals}
        modifyProposalsList={setProposals}
        sortedList={sortedProposals}
      />
      <KeyboardAvoidingView style={styles.bottomSection}>
        <FAB
          icon="plus"
          accessibilityLabel="Nova Proposta"
          onPress={() =>
            navigation.navigate("Nova Proposta", {
              proposalsList: proposals,
              submitNewProposal: setProposals,
            })
          }
        />
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
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
  },
});
