import { ThemeContext } from "@/apps/fitness.app";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Pressable } from "react-native";

const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }: any) => {
    const { colorMode } = React.useContext(ThemeContext);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [actionsheetVisible, setActionsheetVisible] = React.useState(false);

    return (
        <>
            <HStack className="content-center absolute bottom-0 justify-between w-full py-3 px-3 md: hidden">
            {
                bottomTabs.map((tab: any) => {
                    return (
                        <Pressable
                            key={tab.label}
                            onPress={() => {
                                if (tab.label !== "Listing" && tab.label !== "Filter") {
                                    setActiveTab(tab.label);
                                }
                                if (tab.label === "Listing") {
                                    setModalVisible(true);
                                }
                                if (tab.label === "Filter") {
                                    setActionsheetVisible(true);
                                }
                            }}
                            disabled={tab.disabled}
                            //@ts-ignore
                            opacity={tab.disabled ? 0.5 : 1}
                        >
                            <VStack className="items-center">
                                <Icon
                                    as={tab.icon}
                                    size="sm"
                                    className={`${
                                        activeTab === tab.label
                                        ? "text-typography-900"
                                        : "text-typography-400"
                                    }`}
                                />
                                <Text
                                    size="xs"
                                    className={`${
                                        activeTab === tab.label
                                        ? "text-typography-900"
                                        : "text-typography-400"
                                    }`}
                                    >
                                    {tab.label}
                                </Text>
                            </VStack>
                        </Pressable>
                    )
                })
            }
            </HStack>
        </>
    );
}


export default MobileBottomTabs;