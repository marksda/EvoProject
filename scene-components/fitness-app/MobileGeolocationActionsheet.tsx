import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from "@/components/ui/actionsheet";

const MobileGeolocationActionsheet = ({ actionsheetVisible, setActionsheetVisible }: any) => {
  const handleClose = () => {
    setActionsheetVisible(false);
  };

  return (
    <Actionsheet
      isOpen={actionsheetVisible}
      onClose={handleClose}
      snapPoints={[75]}  
    >
      <ActionsheetBackdrop />
      <ActionsheetContent className="w-full ios:pb-20 android:pb-10">

      </ActionsheetContent>
    </Actionsheet>
  );
};

export default MobileGeolocationActionsheet;