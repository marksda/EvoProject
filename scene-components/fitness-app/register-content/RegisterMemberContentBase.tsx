import { Box } from "@/components/ui/box";
import RegisterMemberForm from "../formulir/RegisterMemberForm";
import RegisterMemberContentHeader from "./RegisterMemberContentHeader";

const RegisterMemberContentBase = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <RegisterMemberContentHeader />
      <RegisterMemberForm />
    </Box>
  );
}

export default RegisterMemberContentBase;