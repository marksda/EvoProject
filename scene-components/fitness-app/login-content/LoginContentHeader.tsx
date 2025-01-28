import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const LoginContentHeader = () => {
  const navigation = useNavigation();

  return (         
    <HStack className="items-center gap-4 h-[32px] bg-biru px-4">
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon as={CloseIcon} size="md" className="color-white"/>
      </Pressable>
      <Heading size="md" className="text-white">Login</Heading>
    </HStack>
  );
}

export default LoginContentHeader;