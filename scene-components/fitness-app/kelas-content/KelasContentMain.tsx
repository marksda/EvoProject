import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarKelasQuery } from "@/services/fitness-api-rtkquery-service";
import React, { useState } from "react";
import { ScrollView } from "react-native";

const KelasContentMain = () => {
  const [queryKelasParams] = useState<IQueryParamFilters>({
    is_paging: false, 
    fields_sorter: [
      {
        field_name: 'nama',
        value: 'asc'
      },
    ],
  });
  
  const { data: kelas } = useGetDaftarKelasQuery(queryKelasParams);

  return (
    <ScrollView>
      <VStack>
        {
          kelas?.map((itemKelas) => (
            <Box key={itemKelas.id}>
              <Text>{itemKelas.nama}</Text>
            </Box>
          ))
        }
      </VStack>
    </ScrollView>
  );
};

export default KelasContentMain;