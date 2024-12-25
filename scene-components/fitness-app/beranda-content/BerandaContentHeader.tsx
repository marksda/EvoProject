import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { ImageBackground } from "react-native";

const BerandaContentHeader = ({ setActiveTab, activeTab }: any) => {

    return (
        <Box>
            <ImageBackground
                source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
                className="h-28 flex-1"
            >
                <HStack className="w-full items-center justify-between">
                    <Heading size="md" className="text-white">Halaman beranda</Heading>
                </HStack>
            </ImageBackground>
            <Box className=" h-12 m-1 rounded-md shadow-sm border-l-[4px] border-l-biru"></Box>
        </Box>
    );
}

export default BerandaContentHeader;