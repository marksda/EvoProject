import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
// import Header from "./Header";
import BerandaContent from "./beranda-content/BerandaContent";

const BerandaPage = ({ activeTab, setActiveTab }: any) => {
    return (
        <>
            {/* <Box className={`w-full ${activeTab != "Profile" ? "flex" : "hidden"}`}>
                <Header />
            </Box> */}
            <ScrollView className="h-[1px] md:hidden">
                <Box
                    className={`${activeTab !== "Akun" ? "flex" : "hidden"} md:hidden`}
                >
                    <BerandaContent setActiveTab={setActiveTab} activeTab={activeTab} />
                </Box>
            </ScrollView>
        </>
    );
}

export default BerandaPage;