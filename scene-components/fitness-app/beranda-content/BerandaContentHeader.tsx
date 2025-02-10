import { HStack } from "@/components/ui/hstack";
import { ImageBackground } from "react-native";
import NotifikasiIcon from "../NotifikasiIcon";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";

const BerandaContentHeader = () => {
  return (
    <ImageBackground
      source={require('../../../assets/beranda_banner2.jpg')}
      imageStyle={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}
      className="h-48 flex-1"
    >
      
      <HStack className="my-2 mx-4 justify-between items-center">
        <HStack className="items-center">
          <Image
            size="xs"
            source={require('../../../assets/fitness-logo.png')}
            alt="image"
            className="self-center bg-cyan-400/75 rounded-full p-7 -mr-4"
          />
          <Heading className="text-red-600 text-[22px] rounded-full border-y-2 border-red-600 px-5 py-1">
            FIT-CONN
          </Heading>
        </HStack>        
        <NotifikasiIcon />
      </HStack>
    </ImageBackground>
  );
}

export default BerandaContentHeader;