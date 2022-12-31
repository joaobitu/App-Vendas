import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";
import { useState } from "react";

export default function ProposalList(props) {
  const proposals = props.ProposalList;
  return (
    <View>
      {proposals?.map((obj) => (
        <List.Item
          title={obj.nome}
          description={(obj.PJ === true && obj.CNPJ) || obj.CPF}
          left={(props) => <List.Icon {...props} icon="folder" />}
          right={(props) => <List.Icon {...props} icon="expand" />}
        />
      ))}
    </View>
  );
}
