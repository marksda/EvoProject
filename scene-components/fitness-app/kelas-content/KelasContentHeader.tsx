import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ImageBackground } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const KelasContentHeader = () => {

  return (
    <ImageBackground
      source={require('../../../assets/class_banner2.jpg')}
      className="h-40 flex-1"
    >
      <LinearGradient 
        colors={['#00000000', '#080e5a']} 
        style={{height : '100%', width : '100%'}}
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
      </LinearGradient>
    </ImageBackground>
  );
}

export default KelasContentHeader;