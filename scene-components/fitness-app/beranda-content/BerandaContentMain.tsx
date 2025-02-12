import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";

const BerandaContentMain = () => {
  return (
    <>
      <Box className="px-6 pt-14 pb-4">
        <VStack className="gap-4">
          <HStack className="justify-between p-2 bg-slate-100 border border-orange-500 rounded-md ">
            <HStack className="items-center min-h-14 gap-2">
              <Image 
                source={require('../../../assets/thumnail/give_box.png')}
                size="md"
                alt="image"
                className="self-center"
              />
              <VStack>
                <Heading bold={true} size="lg">Spesial promo</Heading>
                <Text size="md">Free trial 7 hari untuk kamu!</Text>
                <Text size="xs">Coba Gym dan ikut kelas gratis</Text>
              </VStack>            
            </HStack>
            <Pressable className="bg-cyan-500 w-20 h-12 p-3 rounded-md self-center mr-2">
              <Text className="text-white self-center">Klaim</Text>
            </Pressable>
          </HStack>
          <HStack className="justify-between items-baseline">
            <VStack>
              <Heading>Kelas tersedia hari ini</Heading>  
              <Text size="sm">Berdasarkan lokasi club terpilih</Text>
            </VStack>  
            <Pressable>
              <Heading size="sm" sub={false} className="text-cyan-600">Lihat semua</Heading>
            </Pressable>
          </HStack>           
          <Box>
            <ScrollView>
              
            </ScrollView>
          </Box>     
        </VStack>
      </Box>
    </>
  )
}

export default BerandaContentMain;