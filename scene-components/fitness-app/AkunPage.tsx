import { Box } from "@/components/ui/box";
import React from "react";
import { ScrollView } from "react-native";
import AkunContent from "./akun-content/AkunContent";

const AkunPage = ({ activeTab, setActiveTab, isActive }: any) => {
    return isActive == true ? (
        <>
            <ScrollView className="bg-gray-200 h-[1px] md:hidden">
                <Box
                    className={`${activeTab !== "Akun" ? "flex" : "hidden"} md:hidden`}
                >
                    <AkunContent setActiveTab={setActiveTab} activeTab={activeTab} />
                </Box>
            </ScrollView>
        </>
    ):null;
}

export default AkunPage;