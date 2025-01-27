import { Box } from "@/components/ui/box";
import React from "react";
import { StaticScreenProps } from "@react-navigation/native";
import UbahProfileContentBase from "./akun-content/UbahProfileContentBase";
import RegisterMemberContentBase from "./register-content/RegisterMemberContentBase";
import LupaPasswordContentBase from "./login-content/LupaPasswordContentBase";

type Props = StaticScreenProps<{
  id: string;
}>;

const BaseFormulirPage= ({ route }: Props) => {
  const { id } = route.params;
  
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      {(id == "Register Member") && (
        <RegisterMemberContentBase />
      )}
      {(id == "Lupa Password") && (
        <LupaPasswordContentBase />
      )}
      {(id == "Ubah Profile") && (
        <UbahProfileContentBase />
      )}
    </Box>
  );
}

export default BaseFormulirPage;