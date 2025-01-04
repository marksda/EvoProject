import React from "react";
import { ScrollView } from "react-native";
import _ from "lodash"
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";
import { MapPinIcon } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";


const PemesananPersonalTrainerContentMain = () => {
    

    return (
        <>
            <ScrollView
                horizontal={false}
                scrollEventThrottle={50}
            >
                <VStack className="p-1 gap-1">
                    <Pressable className="bg-gray-300 p-2">
                        <HStack className="gap-1">
                            <Icon as={MapPinIcon} />
                            <Text>- Pilih klub -</Text>
                        </HStack>
                    </Pressable>
                    <Text size="sm">Klub terbilih akan dijadikan sebagai kelas bawaan dan personal trainer</Text>
                </VStack>
            </ScrollView>
        </>
    );
}

export default PemesananPersonalTrainerContentMain;