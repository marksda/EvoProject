import { Box } from "@/components/ui/box";
import LupaPasswordContentHeader from "./LupaPasswordContentHeader";
import LupaPasswordForm from "../formulir/LupaPasswordForm";

const LupaPasswordContentBase = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <LupaPasswordContentHeader />
      <LupaPasswordForm />
    </Box>
  );
}

export default LupaPasswordContentBase;