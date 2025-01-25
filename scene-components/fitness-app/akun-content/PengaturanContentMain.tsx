import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ScrollView } from "react-native";
import AccordionBox from "./component/Accordionbox";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/features/ssot/hook";
import RegisterMemberForm from "../formulir/RegisterMemberForm";

const PengaturanContentMain = () => {

  const token = useAppSelector(state => state.persisted.token); 

  const navigation = useNavigation();

  const handleAcordionBoxPress = (id: string) => {
    switch (id) {
      case "Keluar":
        // exitApp();
        break;               
      default:
        // @ts-ignore: Unreachable code error
        navigation.navigate("formulir", { id });
        break;
    }
  };

  return (
    <ScrollView
      className="p-2"
    >
    {token ? (<RegisterMemberForm />) : (
      <VStack space="md">
        <AccordionBox 
          title="Ubah Profile" 
          variant="Kuning"
          setActionPress={handleAcordionBoxPress}
        />
        <AccordionBox 
          title="Ubah Kata Sandi" 
          variant="Kuning"
          setActionPress={handleAcordionBoxPress}
        />
        <AccordionBox 
          title="Kartu Kredit" 
          variant="Kuning"
          setActionPress={handleAcordionBoxPress}
        />
        <AccordionBox 
          title="Hapus Akun" 
          variant="Merah"
          setActionPress={handleAcordionBoxPress}
        />
      </VStack>
    )}
    </ScrollView>
  );
}

export default PengaturanContentMain;