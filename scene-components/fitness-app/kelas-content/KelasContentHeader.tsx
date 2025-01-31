import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ImageBackground } from "react-native";

const KelasContentHeader = () => {

  return (
    <ImageBackground
      source={require('../../../assets/class_banner2.jpg')}
      className="h-40 flex-1"
    >
      <VStack className="pl-8 pt-10">
        <Heading size="2xl" className="text-white font-extrabold">Kelas</Heading>
        <Text
          size="xl" 
          className="color-white font-bold"
        >
          Capai target anda dengan fasilitas kelas kita
        </Text>
      </VStack>
    </ImageBackground>
  );
}

export default KelasContentHeader;