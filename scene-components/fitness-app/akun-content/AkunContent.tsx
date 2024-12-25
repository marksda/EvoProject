import { Box } from "@/components/ui/box"
import AkunContentHeader from "./AkunContentHeader";

const AkunContent = ({
    modalVisible,
    setModalVisible,
    setActiveTab,
    activeTab,
}: any) => {

    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            <AkunContentHeader
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
            />
        </Box>
    );
}

export default AkunContent;