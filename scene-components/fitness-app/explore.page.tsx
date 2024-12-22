import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
import Banner from "./Banner";
import Header from "./Header";

const Explorepage = ({ activeTab, setActiveTab }: any) => {
    return (
        <>
            <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>
                <Header />
            </Box>
            <ScrollView className="h-[1px] md:hidden">
                <Box
                    className={`${activeTab !== "Profile" ? "flex" : "hidden"} md:hidden`}
                >
                    
                </Box>
            </ScrollView>
        </>
    );
}

export default Explorepage;