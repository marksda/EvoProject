import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import React from "react";
import { ImageBackground } from "react-native";

const AkunContentHeader = ({ setActiveTab, activeTab }: any) => {

    return (
        <>
            <ImageBackground
                source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
                className="h-28 flex-1"
            >
                <HStack className="w-full items-center justify-between">
                    <Heading size="md" className="text-white">Halaman Akun</Heading>
                </HStack>
            </ImageBackground>            
        </>
    );
}

export default AkunContentHeader;