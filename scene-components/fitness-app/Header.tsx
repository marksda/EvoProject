import { ThemeContext } from "@/apps/fitness.app";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import React, { useContext } from "react";
import FitnessLogo from "./Header/FitnessLogo";
import HeaderTabs from "./Header/HeaderTabs";
import ToggleMode from "./Header/ToggleMode";
import UserProfile from "./Header/UserProfile";

const Header = React.memo(() => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <>
            {/* big screen */}
            <Box className="px-16 w-full border-b hidden md:flex border-outline-100 min-h-20">
                <HStack className="items-center justify-between mx-auto w-full">
                    <FitnessLogo />
                    <HeaderTabs />
                    <HStack space="lg" className="items-center pr-1.5">
                        <ToggleMode />
                        <UserProfile />
                    </HStack>
                </HStack>
            </Box>
        </>
    );
});

export default Header;