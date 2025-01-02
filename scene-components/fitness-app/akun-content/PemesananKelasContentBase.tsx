import { Box } from "@/components/ui/box"
import PemesananKelasContentHeader from "./PemesananKelasContentHeader";
import PemesananKelasContentMain from "./PemesananKelasContentMain";

const PemesananKelasContentBase = () => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <PemesananKelasContentHeader />
            <PemesananKelasContentMain />
        </Box>
    );
}

export default PemesananKelasContentBase;