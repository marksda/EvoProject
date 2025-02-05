import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAppSelector } from "@/features/ssot/hook";
import React from "react";
import { iconList } from "./KelasContentMain";
import { Icon } from "@/components/ui/icon";
import { AlignEndHorizontal, Clock, Flame } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";

const DetailKelasContentMain = () => {
  const kelas = useAppSelector(state => state.persisted.kelas);

  return (
    <VStack className="p-8">
      <HStack className="justify-between">
        <VStack>
          <Heading>{kelas.nama}</Heading>
          <Heading className="mb-8 ">KELAS</Heading>
          <VStack className="gap-2">
            <HStack className="gap-4 items-center">
              <Icon as={Clock} size="sm" className="color-blue-500"/>
              <Text className="w-36" size="sm">Durasi</Text>
              <Text size="sm" className="text-black">{kelas.durasi}</Text>
            </HStack>
            <HStack className="gap-4 items-center">
              <Icon as={AlignEndHorizontal} size="sm" className="color-green-500"/>
              <Text className="w-36" size="sm">Level</Text>
              <Text size="sm" className="text-black">{kelas.level?.nama}</Text>
            </HStack>   
            <HStack className="gap-4 items-center">
              <Icon as={Flame} size="sm" className="color-red-500"/>
              <Text className="w-36" size="sm">Pembakaran kalori</Text>
              <Text size="sm" className="text-black">{kelas.level?.nama}</Text>
            </HStack> 
          </VStack>          
        </VStack>
        <VStack>
          <HStack>
            <Text
              size="lg" 
              bold={true}
              // @ts-ignore
              className="mr-1 py-1 px-3"
            >
              {kelas.kelas_kategori?.nama}
            </Text>
            <Image 
              // @ts-ignore
              source={iconList[kelas.kelas_kategori.nama]} 
              className="h-8 w-8"
              alt="icon"
            />
          </HStack> 
          <HStack className="flex-row-reverse mt-[82px] ">         
            <Pressable className="w-[96px] bg-red-700 py-2 px-3 rounded-full items-center elevation-md">
              <Text className="text-white">Daftar</Text>
            </Pressable>
          </HStack>
        </VStack>
      </HStack> 
      <Divider className="my-4" />
      <Text bold={true} className="text-black bg-slate-300 px-4 py-2 w-[90px] rounded-lg mb-4">
        Deskripsi
      </Text>
      <Text className="text-justify" allowFontScaling={true}>
        {kelas.deskripsi}
      </Text>
    </VStack>
  );
};

export default DetailKelasContentMain;