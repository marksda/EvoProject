import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { IQueryParamFilters } from "@/features/entities/query-param-filters";
import { useGetDaftarKelasQuery } from "@/services/fitness-app/fitness-api-rtkquery-service";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground } from "react-native";
import { ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import _ from "lodash";
import { useAppDispatch } from "@/features/ssot/hook";
import { setKelas } from "@/services/fitness-app/kelas-slice";


export const iconList = {
  ["DANCE"]: require('../../../assets/icons/DANCE.webp'),
  ["CARDIO"]: require('../../../assets/icons/CARDIO.webp'),
  ["STRENGTH"]: require('../../../assets/icons/STRENGTH.webp'),
  ["MIND & BODY"]: require('../../../assets/icons/MIND_BODY.webp'),
};

export const imagesList = {
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
};

const colorTextList = {
  ["DANCE"]: "text-green-400",
  ["CARDIO"]: "text-yellow-400",
  ["STRENGTH"]: "text-red-600",
  ["MIND & BODY"]: "text-cyan-500",
}

const KelasContentMain = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [queryKelasParams] = useState<IQueryParamFilters>({
    is_paging: false, 
    fields_sorter: [
      {
        field_name: "kelas_kategori_id",
        value: "asc"
      },
      {
        field_name: "nama",
        value: "asc"
      }
    ],
  });
  
  const { data: kelas } = useGetDaftarKelasQuery(queryKelasParams);

  const handleDaftarKelas = (idKelas: string) => {    
    let hasil = _.find(kelas, (item) => item.id == idKelas);
    dispatch(setKelas(hasil!));
    // @ts-ignore: Unreachable code error
    navigation.navigate("submain", {id: "Pendaftaran Kelas"});          
  };

  const handleDetailKelas = (idKelas: string) => {    
    let hasil = _.find(kelas, (item) => item.id == idKelas);
    dispatch(setKelas(hasil!));
    // @ts-ignore: Unreachable code error
    navigation.navigate("submain", {id: "Detail Kelas"});          
  };

  return (
    <ScrollView>
      <Box className="flex-row flex-wrap py-2 px-1">
        {
          kelas?.map((itemKelas) => (
            <Box
              key={itemKelas.id}
              className="h-48 mb-2 ood:ml-1 odd:w-1/2 odd: pr-1 even:pl-1"
            >
              <ImageBackground
                // @ts-ignore
                source={imagesList[itemKelas.nama]}
                className="h-48"
                imageStyle={{ borderRadius: 8}}
              >
                <LinearGradient 
                  colors={['#00000000', '#080e5a']} 
                  style={{height : '100%', width : '100%', borderRadius: 8}}
                >
                  <Text 
                    className="rounded-t-lg py-1 px-2 text-white bg-biru/45 font-extrabold"
                  >
                    {itemKelas.nama}
                  </Text>
                  <HStack className="mt-4 flex-row-reverse pr-2">
                    <Image 
                      // @ts-ignore
                      source={iconList[itemKelas.kelas_kategori.nama]} 
                      className="h-8 w-8"
                      alt="icon"
                    />
                    <Text
                      size="sm" 
                      // @ts-ignore
                      className={`mr-1 py-1 px-3 rounded-full bg-black/60 ${colorTextList[itemKelas.kelas_kategori.nama]}`}
                    >
                      KELAS {itemKelas.kelas_kategori?.nama}
                    </Text>
                  </HStack>
                  <HStack className="justify-between mt-16 mx-4">
                    <Pressable 
                      onPress={(e) => {handleDaftarKelas(itemKelas.id!);}}
                      className="w-[80px] p-1 rounded-full bg-white/30"
                    >
                      <Text className="text-white text-center">Daftar</Text>  
                    </Pressable>  
                    <Pressable 
                      onPress={(e) => {handleDetailKelas(itemKelas.id!);}}
                      className="w-[80px] p-1 rounded-full bg-white/30"
                    >
                      <Text className="text-white text-center">Detail</Text>  
                    </Pressable>  
                  </HStack>                  
                </LinearGradient>
              </ImageBackground>              
            </Box>
          ))
        }
      </Box>
    </ScrollView>
  );
};

export default KelasContentMain;