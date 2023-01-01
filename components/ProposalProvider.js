import React, { createContext, useContext, useState } from "react";

const ProposalsContext = createContext();

export const ProposalsProvider = ({ children }) => {
  const [proposals, setProposals] = useState([]);

  return (
    <ProposalsContext.Provider value={{ proposals, setProposals }}>
      {children}
    </ProposalsContext.Provider>
  );
};

export const useProposals = () => {
  const context = useContext(ProposalsContext);
  if (!context) {
    throw new Error("useProposals must be used within a ProposalsProvider");
  }
  const { proposals, setProposals } = context;
  return { proposals, setProposals };
};
