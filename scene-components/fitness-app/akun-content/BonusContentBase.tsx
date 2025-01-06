import { Box } from "@/components/ui/box";
import BonusContentHeader from "./BonusContentHeader";
import BonusContentMain from "./BonusContentMain";

const BonusContentBase = () => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <BonusContentHeader />
            <BonusContentMain />
        </Box>
    );
}

export default BonusContentBase;