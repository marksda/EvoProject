import { Box } from "@/components/ui/box";
import LoginForm from "../formulir/LoginForm";
import LupaPasswordContentHeader from "./LupaPasswordContentHeader";

const LupaPasswordContentBase = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <LupaPasswordContentHeader />
      <LoginForm />
    </Box>
  );
}

export default LupaPasswordContentBase;