import { Box } from "@/components/ui/box"
import TagihanContentHeader from "./TagihanContentHeader";
import TagihanContentMain from "./TagihanContentMain";

const TagihanContentBase = () => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <TagihanContentHeader />
            <TagihanContentMain />
        </Box>
    );
}

export default TagihanContentBase;