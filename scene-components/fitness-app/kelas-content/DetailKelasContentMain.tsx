import { Text } from "@/components/ui/text";
import { useAppSelector } from "@/features/ssot/hook";
import React from "react";

const DetailKelasContentMain = () => {
  const kelas = useAppSelector(state => state.persisted.kelas);

  return (
    <>
      <Text>{kelas.deskripsi}</Text>
    </>
  );
};

export default DetailKelasContentMain;