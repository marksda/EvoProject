import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack";
import { Bell } from "lucide-react-native";

const NotifikasiIcon = () => {
  return (
    <Pressable>
      <VStack>
        <Box className="bg-slate-200 p-2 rounded-lg">
          <Icon as={Bell} size="xl"/>
        </Box>        
        <Badge
          className="z-10 self-end h-[14px] w-[14] bg-red-600 rounded-full -mt-2 -mr-2"
          variant="solid"
        >
        </Badge>
      </VStack>
    </Pressable>
  )
};

export default NotifikasiIcon;