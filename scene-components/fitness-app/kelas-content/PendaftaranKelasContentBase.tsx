import React from "react";
import PendaftaranKelasContentHeader from "./PendaftaranKelasContentHeader";
import PendaftaranKelasContentMain from "./PendaftaranKelasContentMain";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";

const PendaftaranKelasContentBase = () => {
  return (
      <>
        <Box className="h-12">
          <PendaftaranKelasContentHeader />
        </Box>
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="bg-transparent w-full"
        >
          <PendaftaranKelasContentMain />
        </ScrollView>        
      </>
  )
}

export default PendaftaranKelasContentBase;