import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "@/components/ui/actionsheet";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import DateTimePicker from "react-native-ui-datepicker";

const MobileTanggalLahirActionsheet = ({ actionsheetVisible, setActionsheetVisible,  tanggal_lahir, onChangeTanggalLahir}: any) => {
  const handleClose = () => {
    setActionsheetVisible(false);
  };

  const handleChangeTanggalLahir = (params: any) => {
    onChangeTanggalLahir(params.date);
    setActionsheetVisible(false);
  };

  return (
  <Actionsheet
    isOpen={actionsheetVisible}
    onClose={handleClose}
    snapPoints={[70]}  
  >
    <ActionsheetBackdrop />        
    <ActionsheetContent className="w-full ios:pb-20 android:pb-10"> 
      <ActionsheetDragIndicatorWrapper>
        <ActionsheetDragIndicator />                    
      </ActionsheetDragIndicatorWrapper>
      <VStack className="absolute left-4 top-5 w-full"> 
        <Box className="mt-2 border p-4 border-gray-200">
          <DateTimePicker   
            mode="single"
            date={tanggal_lahir}
            onChange={handleChangeTanggalLahir}
          />
        </Box>
      </VStack>
    </ActionsheetContent>        
  </Actionsheet>
  );
}

export default MobileTanggalLahirActionsheet;