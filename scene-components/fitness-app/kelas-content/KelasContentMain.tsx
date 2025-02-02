import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarKelasQuery } from "@/services/fitness-api-rtkquery-service";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";


const imagesList = {
  ["BELLY DANCE"]: require('../../../assets/bg-card/BELLY_DANCE.jpg'),
  ["BODYCOMBAT"]: require('../../../assets/bg-card/BODYCOMBAT.jpg'),
  ["BOOTCAMP"]: require('../../../assets/bg-card/BOOTCAMP.jpg'),
  ["BOOTY SHAPING"]: require('../../../assets/bg-card/BOOTY_SHAPING.jpg'),
  ["CARDIO DANCE"]: require('../../../assets/bg-card/CARDIO_DANCE.jpg'),
  ["CIRCUIT"]: require('../../../assets/bg-card/CIRCUIT.jpg'),
  ["CORE"]: require('../../../assets/bg-card/CORE.jpg'),
  ["FREESTYLE DANCE"]: require('../../../assets/bg-card/FREESTYLE_DANCE.jpg'),
  ["HIIT"]: require('../../../assets/bg-card/HIIT.jpg'),
  ["HIP HOP DANCE"]: require('../../../assets/bg-card/HIP_HOP_DANCE.jpg'),
  ["KAPHA YOGA"]: require('../../../assets/bg-card/KAPHA_YOGA.jpg'),
  ["LADIES STYLE BACHATA"]: require('../../../assets/bg-card/LADIES_STYLE_BACHATA.jpg'),
  ["MAT PILATES"]: require('../../../assets/bg-card/MAT_PILATES.jpg'),
  ["PILOXING"]: require('../../../assets/bg-card/PILOXING.jpg'),
  ["POUND FIT"]: require('../../../assets/bg-card/POUND_FIT.jpg'),
  ["FIT CYCLE"]: require('../../../assets/bg-card/FIT_CYCLE.jpg'),
  ["FIT RUSH"]: require('../../../assets/bg-card/FIT_RUSH.jpg'),
  ["STRONG NATION"]: require('../../../assets/bg-card/STRONG_NATION.jpg'),
  ["THAI BOXING"]: require('../../../assets/bg-card/THAI_BOXING.jpg'),
  ["VINYASA YOGA"]: require('../../../assets/bg-card/VINYASA_YOGA.jpg'),
  ["ZUMBA"]: require('../../../assets/bg-card/ZUMBA.jpg'),
}

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

  // const getPath = (nama: string):ImageSourcePropType|undefined   => {
  //   let pathImage = getImagepath(nama);
  //   return require(pathImage);
  // }

  return (
    <ScrollView>
      <VStack>
        {
          kelas?.map((itemKelas) => (
            <Box key={itemKelas.id} className="p-2">
              <ImageBackground
                // @ts-ignore
                source={imagesList[itemKelas.nama]}
                className="w-1/2 h-48 flex-1"
              >
                <LinearGradient 
                  colors={['#00000000', '#080e5a']} 
                  style={{height : '100%', width : '100%'}}
                >
                  <Text className="text-white">{itemKelas.nama}</Text>
                </LinearGradient>
              </ImageBackground>
            </Box>
          ))
        }
      </VStack>
    </ScrollView>
  );
};

export default KelasContentMain;