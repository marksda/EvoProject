import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "@/components/ui/actionsheet";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const dataKabupaten = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];

const MobileGeolocationActionsheet = ({ actionsheetVisible, setActionsheetVisible }: any) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

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
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />                    
        </ActionsheetDragIndicatorWrapper>
        <VStack className="absolute left-4 top-8 w-full">
          <HStack>
            <Dropdown 
              style={[styles.dropdown, isFocus && { borderColor: '#080e5a' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              value={value}
              data={dataKabupaten}
              search
              maxHeight={300}
              labelField="label"
              valueField="value" 
              onChange={item => {
                setValue(item.value);
              }}   
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}           
            />
          </HStack>
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    minWidth: 150, 
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default MobileGeolocationActionsheet;