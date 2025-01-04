import { Box } from "@/components/ui/box"
import PemesananPersonalTrainerContentHeader from "./PemesananPersonalTrainerContentHeader";
import PemesananPersonalTrainerContentMain from "./PemesananPersonalTrainerContentMain";

const PemesananPersonalTrainerContentBase = () => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <PemesananPersonalTrainerContentHeader />
            <PemesananPersonalTrainerContentMain />
        </Box>
    );
}

export default PemesananPersonalTrainerContentBase;