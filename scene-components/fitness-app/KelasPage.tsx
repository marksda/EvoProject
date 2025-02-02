import React from "react";
import { ScrollView } from "react-native";
import KelasContentBase from "./kelas-content/KelasContentBase";

const KelasPage = ({ isActive }: any) => {
  return isActive == true ? (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className="bg-transparent w-full"
    >
      <KelasContentBase />
    </ScrollView>
  ):null;
}

export default KelasPage;