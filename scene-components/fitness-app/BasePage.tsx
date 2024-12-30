import { Box } from "@/components/ui/box";
import { 
    Home, 
    Fence,
    IdCard, 
    User 
} from "lucide-react-native";
import MobileBottomTabs from "./MobileBottomTabs";
import React from "react";
import BerandaPage from "./BerandaPage";
import AkunPage from "./AkunPage";


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

const BasePage = () => {
    const [activeTab, setActiveTab] = React.useState("Beranda");

    return (
        <>
            <Box className="flex-1">
                <Box className="flex-1">
                    <BerandaPage  isActive={activeTab === "Beranda"} setActiveTab={setActiveTab} activeTab={activeTab} />
                    <AkunPage isActive={activeTab === "Akun"} />
                </Box>
                <Box className="h-[52px] items-center w-full flex md:hidden border-t border-outline-50">
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

export default BasePage;