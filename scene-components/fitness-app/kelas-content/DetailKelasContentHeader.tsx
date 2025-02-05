import { useAppSelector } from "@/features/ssot/hook";
import React from "react";
import { ImageBackground } from "react-native";
import { imagesList } from "./KelasContentMain";
import { Icon } from "@/components/ui/icon";
import { CircleArrowLeftIcon } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "@/components/ui/pressable";

const DetailKelasContentHeader = () => {
  const navigation = useNavigation();
  const kelas = useAppSelector(state => state.persisted.kelas);

  return (
    <ImageBackground
    // @ts-ignore
      source={imagesList[kelas.nama]}
      className="flex-1"
      resizeMode="stretch"
    >
      <Pressable 
        onPress={
          () => {
            navigation.goBack(); 
          }
        }
      >
        <Icon 
          as={CircleArrowLeftIcon} 
          // @ts-ignore
          size="102"   
          className="ml-4 mt-4 color-white"
        />
      </Pressable>
    </ImageBackground>
  );
}

export default DetailKelasContentHeader;