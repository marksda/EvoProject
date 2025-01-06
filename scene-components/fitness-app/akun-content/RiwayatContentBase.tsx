import { Box } from "@/components/ui/box"
import RiwayatContentHeader from "./RiwayatContentHeader";
import RiwayatContentMain from "./RiwayatContentMain";

const RiwayatContentBase = () => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <RiwayatContentHeader />
            <RiwayatContentMain />
        </Box>
    );
}

export default RiwayatContentBase;