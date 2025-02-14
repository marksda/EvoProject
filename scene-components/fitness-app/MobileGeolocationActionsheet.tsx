import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "@/components/ui/actionsheet";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarClubKabupatenQuery, useGetDaftarClubQuery } from "@/services/fitness-app/fitness-api-rtkquery-service";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";


const MobileGeolocationActionsheet = ({ actionsheetVisible, setActionsheetVisible }: any) => {
  const [value, setValue] = useState<string|null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [queryKabupatenParams, setQueryKabupatenParams] = useState<IQueryParamFilters>({
    is_paging: false,  
    paging: {
      pageNumber: 1,
      pageSize: 25
    },
    fields_filter: [],
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });
  const [queryClubParams] = useState<IQueryParamFilters>({
    is_paging: false, 
    fields_filter: [],
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });


  const { data: kabupatens } = useGetDaftarClubKabupatenQuery(queryKabupatenParams);
  const { data: clubs } = useGetDaftarClubQuery(queryClubParams, {skip: value == null ? true:false});

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
              data={kabupatens ? kabupatens:[]}
              search
              maxHeight={300}
              labelField="nama"
              valueField="id" 
              onChange={item => {
                setValue(item.id);
              }}   
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}           
            />
          </HStack>
          {
            clubs ? 
              clubs.map((club) => (
                <Text key={club.id}>{club.nama}</Text>
              ))
              : null
          }
        </VStack>
      </ActionsheetContent>
    </Actionsheet>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 40,
    minWidth: 250, 
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