import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { useState } from "react";

import ProposalList from "./ProposalList";

export default function Homepage({ navigation }) {
  const [proposals, setProposals] = useState([]);

  return (
    <View style={styles.container}>
      <ProposalList proposalsList={proposals} />
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
    paddingVertical: 50,
  },

  bottomSection: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
});
