import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem } from "@/components/ui/actionsheet";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const MobileSidebarActionsheet = ({ actionsheetVisible, setActionsheetVisible }: any) => {
    const handleClose = () => {
        setActionsheetVisible(false);
    };

    return (
    <Actionsheet
        isOpen={actionsheetVisible}
        onClose={handleClose}
        snapPoints={[80]}  
    >
        <ActionsheetBackdrop />        
        <ActionsheetContent className="w-full ios:pb-20 android:pb-10">  
            <ActionsheetDragIndicatorWrapper>
                <ActionsheetDragIndicator />                    
            </ActionsheetDragIndicatorWrapper>
            <VStack className="absolute left-4 top-5 w-full">
                <HStack className="gap-2">
                    <Pressable
                        onPress={handleClose}
                        className="ml-2"
                    >
                        <Icon as={CloseIcon} size="md"/>
                    </Pressable>
                    <Text size="sm" bold={true} className="antialiased">Daftar Paket</Text>
                </HStack>
                <Divider className="my-2"/>
            </VStack>
        </ActionsheetContent>        
    </Actionsheet>
    );
}

export default MobileSidebarActionsheet;