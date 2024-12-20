import { Box } from "@/components/ui/box";
import { 
    Home, 
    SlidersHorizontal, 
    Plus, 
    MessageCircle, 
    User } from "lucide-react-native";
import { useState } from "react";
import { StatusBar } from "react-native";
import MobileBottomTabs from "./MobileBottomTabs";


const bottomTabs = [
    {
      icon: Home,
      label: "Home",
    },
    {
      icon: SlidersHorizontal,
      label: "Filter",
    },
    {
      icon: Plus,
      label: "Listing",
    },
    {
      icon: MessageCircle,
      label: "Inbox",
      disabled: true,
    },
    {
      icon: User,
      label: "Profile",
    },
];

const HomePage = () => {
    const [activeTab, setActiveTab] = useState("Home");

    return (
        <Box className="flex-1">
            <StatusBar />
            <Box className="h-[72px] items-center w-full flex md:hidden border-t border-outline-50">
                <MobileBottomTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    bottomTabs={bottomTabs}
                />
            </Box>
        </Box>
    );
}