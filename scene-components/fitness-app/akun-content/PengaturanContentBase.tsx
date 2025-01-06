import { Box } from "@/components/ui/box"
import PengaturanContentHeader from "./PengaturanContentHeader";
import PengaturanContentMain from "./PengaturanContentMain";

const PengaturanContentBase = () => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <PengaturanContentHeader />
            <PengaturanContentMain />
        </Box>
    );
}

export default PengaturanContentBase;