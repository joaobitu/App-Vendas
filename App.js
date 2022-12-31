import { Provider as PaperProvider } from "react-native-paper";
import NewProposalModal from "./components/NewProposalModal";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homepage from "./components/Homepage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Propostas">
          <Stack.Screen name="Propostas" component={Homepage} />
          <Stack.Screen name="Nova Proposta" component={NewProposalModal} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
