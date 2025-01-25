import { Box } from "@/components/ui/box";
import React from "react";
import { StaticScreenProps } from "@react-navigation/native";
import UbahProfileContentBase from "./akun-content/UbahProfileContentBase";
import LoginContentBase from "./login-content/LoginContentBase";

type Props = StaticScreenProps<{
    id: string;
}>;

const BaseFormulirPage= ({ route }: Props) => {
    const { id } = route.params;
    
    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            {(id == "Ubah Profile") && (
              <UbahProfileContentBase />
            )}
            {(id == "Login") && (
              <LoginContentBase />
            )}
        </Box>
    );
}

export default BaseFormulirPage;