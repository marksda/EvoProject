import { Box } from "@/components/ui/box";
import React from "react";
import BerandaPage from "./BerandaPage";
import AkunPage from "./AkunPage";


const BaseDetailPage = () => {
    const [activeTab, setActiveTab] = React.useState("Beranda");

    return (
        <>
            <Box className="flex-1">
                <Box className="flex-1">                    
                </Box>
            </Box>
        </>
    );
}

export default BaseDetailPage;