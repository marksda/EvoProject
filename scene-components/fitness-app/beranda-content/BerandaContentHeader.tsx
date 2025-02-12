import { HStack } from "@/components/ui/hstack";
import { Image as RNImage, ImageBackground } from "react-native";
import NotifikasiIcon from "../NotifikasiIcon";
import { Heading } from "@/components/ui/heading";
// import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";
import { Icon } from "@/components/ui/icon";
import { ChevronDown } from "lucide-react-native";

const BerandaContentHeader = ({ setActionsheetVisible }: any) => {
  const handleOpenActionSheet = () => {
    console.log('open');
    setActionsheetVisible(true);
  };

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
      <Pressable className="mt-[70px] shadow-md" onPress={handleOpenActionSheet} >
        <HStack className="self-center justify-between bg-slate-100 px-4 py-2 w-11/12 rounded-lg min-h-16">
          <HStack className="gap-4">
            <RNImage 
              source={require('../../../assets/icons/building_location_circle.png')}
              alt="image"
              className="self-center w-6 h-6"
            />
            <Text>Pilih Lokasi Terdekat</Text>
          </HStack>
          <Icon as={ChevronDown} className="self-center" />
        </HStack>
      </Pressable>
    </ImageBackground>
  );
}

export default BerandaContentHeader;