import { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import NewProposalModal from "./components/NewProposalModal";
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import Homepage from "./components/Homepage";

export default function App() {
  const [proposals, setProposals] = useState([]);
  return (
    <NativeRouter>
      <PaperProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={<Homepage proposalsList={proposals} />}
          />
          <Route exact path="/newProposal" element={<NewProposalModal />} />
        </Routes>
      </PaperProvider>
    </NativeRouter>
  );
}
