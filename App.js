import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { Provider as PaperProvider, FAB } from "react-native-paper";
import NewProposalModal from "./components/NewProposalModal";

export default function App() {
  const [dados, setDados] = useState({});
  const [modal, setModal] = useState(false);

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text>Propostas de Venda</Text>
        <StatusBar style="auto" />
        {modal && <NewProposalModal leave={setModal} />}
        <KeyboardAvoidingView style={styles.bottomSection}>
          <FAB
            icon={(!modal && "plus") || "check"}
            accessibilityLabel="Nova Proposta"
            onPress={() => {
              !modal ? setModal(!modal) : setModal(!modal); //vira um botao de submit depois que é clicado
            }}
          />
        </KeyboardAvoidingView>
      </View>
    </PaperProvider>
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
