import React from "react";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import DetailKelasContentHeader from "./DetailKelasContentHeader";
import DetailKelasContentMain from "./DetailKelasContentMain";

const DetailKelasContentBase = () => {
  return (
      <>
        <Box className="h-72">
          <DetailKelasContentHeader />
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-transparent w-full"
        >
          <DetailKelasContentMain />
        </ScrollView>        
      </>
  )
}

export default DetailKelasContentBase;