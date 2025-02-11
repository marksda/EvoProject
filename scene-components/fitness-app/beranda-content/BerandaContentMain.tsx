import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const BerandaContentMain = () => {
  return (
    <>
      <Box className="px-6 py-4">
        <VStack className="gap-1">
          <HStack className="bg-slate-200 border border-orange-500 rounded-md min-h-14 p-4">
            <Image 
              source={require('../../../assets/thumnail/give_box.png')}
              size="md"
              alt="image"
              className="self-center"
            />
            <Text>Klaim</Text>
          </HStack>
        </VStack>
      </Box>
    </>
  )
}

export default BerandaContentMain;