import { Box } from "@/components/ui/box";
import LoginContentHeader from "./LoginContentHeader";
import LoginForm from "../formulir/LoginForm";

const LoginContentBase = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <LoginContentHeader />
      <LoginForm />
    </Box>
  );
}

export default LoginContentBase;