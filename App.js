import { Provider as PaperProvider } from "react-native-paper";
import NewProposalModal from "./src/layout/NewProposalModal";
import { ProposalsProvider } from "./src/global_state/ProposalProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./src/layout/Homepage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ProposalsProvider>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator initialRouteName="Propostas">
            <Stack.Screen name="Propostas" component={Homepage} />
            <Stack.Screen name="Nova Proposta" component={NewProposalModal} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </ProposalsProvider>
  );
}
