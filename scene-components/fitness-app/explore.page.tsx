import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
// import Header from "./Header";
import MainContent from "./main-content/MainContent";

const Explorepage = ({ activeTab, setActiveTab }: any) => {
    return (
        <>
            {/* <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>
                <Header />
            </Box> */}
            <ScrollView className="h-[1px] md:hidden">
                <Box
                    className={`${activeTab !== "Profile" ? "flex" : "hidden"} md:hidden`}
                >
                    <MainContent setActiveTab={setActiveTab} activeTab={activeTab} />
                </Box>
            </ScrollView>
        </>
    );
}

export default Explorepage;