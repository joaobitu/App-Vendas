import React from "react";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { FAB } from "react-native-paper";
import { Link } from "react-router-native";
import ProposalList from "./ProposalList";

export default function Homepage(props) {
  return (
    <View style={styles.container}>
      <Text>Propostas de Venda</Text>
      <ProposalList proposalsList={props.proposalList} />
      <KeyboardAvoidingView style={styles.bottomSection}>
        <Link to="/newProposal">
          <FAB icon="plus" accessibilityLabel="Nova Proposta" />
        </Link>
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
  addButton: {
    backgroundColor: "#42A5F5",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    width: 170,
  },
  bottomSection: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",

    fontWeight: "700",
  },
});
