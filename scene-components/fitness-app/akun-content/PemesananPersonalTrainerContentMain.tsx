import React from "react";
import { ScrollView } from "react-native";
import _ from "lodash"
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { GlobeIcon, MapPinIcon } from "lucide-react-native";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";


const PemesananPersonalTrainerContentMain = () => {
    const [showMenuPilihKlub, setShowMenuPilihKlub] = React.useState(false);

    const handleOpen = () => {
        setShowMenuPilihKlub(true)
      }
      const handleClose = () => {
        setShowMenuPilihKlub(false)
      }

    return (
        <>
            <ScrollView
                horizontal={false}
                scrollEventThrottle={50}
            >
                <VStack className="p-2 gap-1">  
                    <Menu
                        placement="bottom left"
                        trigger={(triggerProps) => {
                            return (
                                <Pressable 
                                    {...triggerProps}
                                    className="bg-gray-300 p-2 shadow-sm"
                                >
                                    <HStack className="gap-1">
                                        <Icon as={MapPinIcon} />
                                        <Text>- Pilih klub -</Text>
                                    </HStack>
                                </Pressable>
                            )
                        }}
                        className="top-[-22px] rounded-none shadow-none bg-slate-50"
                    >
                        <MenuItem key="Add account" textValue="Add account">
                            <Icon as={AddIcon} size="sm" className="mr-2" />
                            <MenuItemLabel size="sm">Add account</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Community" textValue="Community">
                            <Icon as={GlobeIcon} size="sm" className="mr-2" />
                            <MenuItemLabel size="sm">Community</MenuItemLabel>
                        </MenuItem>
                    </Menu>
                    <Text size="sm">Klub terpilih dijadikan kelas bawaan dan personal trainer</Text>
                </VStack>
            </ScrollView>
        </>
    );
}

export default PemesananPersonalTrainerContentMain;