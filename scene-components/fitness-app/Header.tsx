import { ThemeContext } from "@/apps/fitness.app";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import React, { useContext } from "react";
import FitnessLogo from "./Header/FitnessLogo";
import HeaderTabs from "./Header/HeaderTabs";
import ToggleMode from "./Header/ToggleMode";
import UserProfile from "./Header/UserProfile";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

const Header = React.memo(() => {
    const { colorMode } = useContext(ThemeContext);

    return (
        <>
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
            <Box className="p-5 md:hidden w-full">
                <Input variant="rounded" size="sm" className="w-full h-10">
                    <InputField placeholder="Anywhere • Any week • Add guests" />
                    <InputSlot className="bg-primary-500 rounded-full h-6 w-6 m-1.5">
                        <InputIcon
                            as={SearchIcon}
                            color={colorMode === "light" ? "#FEFEFF" : "#171717"}
                        />
                    </InputSlot>
                </Input>
            </Box>
        </>
    );
});

export default Header;