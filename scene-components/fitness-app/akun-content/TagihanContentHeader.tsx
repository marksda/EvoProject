import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "lucide-react-native";
import React from "react";

const TagihanContentHeader = () => {
    const navigation = useNavigation();

    return (
        <Box className="h-[32px] bg-biru px-4">            
            <HStack className="items-center gap-2">
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon as={ChevronLeftIcon} size="md" className="color-white"/>
                </Pressable>
                <Heading size="md" className="text-white">Tagihan</Heading>
            </HStack>         
        </Box>
    );
}

export default TagihanContentHeader;