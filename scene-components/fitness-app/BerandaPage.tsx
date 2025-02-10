import React from "react";
import { ScrollView } from "react-native";
import BerandaContentBase from "./beranda-content/BerandaContentBase";

const BerandaPage = ({ isActive }: any) => {
  return isActive == true ? (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className="bg-transparent w-full"
    >
      <BerandaContentBase />
    </ScrollView>
  ):null;
}

export default BerandaPage;