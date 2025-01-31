import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
import AkunContentBase from "./akun-content/AkunContentBase";

const AkunPage = ({ activeTab, setActiveTab, isActive }: any) => {
  return isActive == true ? (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className="bg-transparent"
    >
      <AkunContentBase setActiveTab={setActiveTab} activeTab={activeTab} />
    </ScrollView>
  ):null;
}

export default AkunPage;