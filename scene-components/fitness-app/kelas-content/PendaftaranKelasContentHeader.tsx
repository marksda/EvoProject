import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ChevronLeftIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const PendaftaranKelasContentHeader = () => {
  const navigation = useNavigation();

  return (
    <Box className="h-12 bg-biru px-4">            
      <HStack className="items-center gap-4">
        <Pressable
            onPress={() => {
                navigation.goBack();
            }}
        >
          <Icon as={ChevronLeftIcon} size="md" className="color-white"/>
        </Pressable>
        <Heading size="md" className="text-white">Pendaftaran Kelas</Heading>
      </HStack>         
    </Box>
  );
}

export default PendaftaranKelasContentHeader;