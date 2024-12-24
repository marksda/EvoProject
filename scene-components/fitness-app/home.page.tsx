import { Box } from "@/components/ui/box";
import { 
    Home, 
    Fence,
    IdCard, 
    User } from "lucide-react-native";
import { StatusBar } from "react-native";
import MobileBottomTabs from "./MobileBottomTabs";
import React from "react";
import Explorepage from "./explore.page";


const bottomTabs = [
    {
      icon: Home,
      label: "Beranda",
    },
    {
      icon: IdCard,
      label: "Membership",
    },
    {
      icon: Fence,
      label: "Kelas",
    },
    {
      icon: User,
      label: "Akun",
    },
];

const HomePage = () => {
    const [activeTab, setActiveTab] = React.useState("Beranda");

    return (
        <>
            <Box className="flex-1">
                <StatusBar hidden={false} translucent={true} backgroundColor={'transparent'}/>
                <Box className="flex-1">
                    <Explorepage setActiveTab={setActiveTab} activeTab={activeTab} />
                </Box>
                <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
                    <MobileBottomTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        bottomTabs={bottomTabs}
                    />
                </Box>
            </Box>
        </>
    );
}

export default HomePage;