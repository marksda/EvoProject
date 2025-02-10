import React from "react";
import { ScrollView } from "react-native";
import BerandaContentBase from "./beranda-content/BerandaContentBase";

const BerandaPage = ({ isActive }: any) => {
  return isActive == true ? (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      className="bg-slate-300 w-full"
    >
      <BerandaContentBase />
    </ScrollView>
  ):null;
}

export default BerandaPage;