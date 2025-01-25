import { Box } from "@/components/ui/box";
import UbahProfileContentHeader from "./UbahProfileContentHeader";
import UbahProfileContentMain from "./UbahProfileContentMain";

const UbahProfileContentBase = () => {
  return (
    <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
      <UbahProfileContentHeader />
      <UbahProfileContentMain />
    </Box>
  );
}

export default UbahProfileContentBase;