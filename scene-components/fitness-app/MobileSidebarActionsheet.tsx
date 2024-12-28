import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "@/components/ui/actionsheet";

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
        </ActionsheetContent>
    </Actionsheet>
    );
}

export default MobileSidebarActionsheet;