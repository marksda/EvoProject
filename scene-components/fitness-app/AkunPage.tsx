import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
import AkunContent from "./akun-content/AkunContent";

const AkunPage = ({ activeTab, setActiveTab }: any) => {
    return (
        <>
            <ScrollView className="h-[1px] md:hidden">
                <Box
                    className={`${activeTab !== "Akun" ? "flex" : "hidden"} md:hidden`}
                >
                    <AkunContent setActiveTab={setActiveTab} activeTab={activeTab} />
                </Box>
            </ScrollView>
        </>
    );
}

export default AkunPage;