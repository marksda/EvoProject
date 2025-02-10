import { HStack } from "@/components/ui/hstack";
import { ImageBackground } from "react-native";
import NotifikasiIcon from "../NotifikasiIcon";

const BerandaContentHeader = () => {
  return (
    <ImageBackground
      source={require('../../../assets/beranda_banner2.jpg')}
      imageStyle={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}
      className="h-48 flex-1"
    >
      <HStack className="my-2 mx-4 justify-end">
        <NotifikasiIcon />
      </HStack>      
    </ImageBackground>
  );
}

export default BerandaContentHeader;