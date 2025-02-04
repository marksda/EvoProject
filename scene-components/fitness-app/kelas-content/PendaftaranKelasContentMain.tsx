import { Text } from "@/components/ui/text";
import { useAppSelector } from "@/features/ssot/hook";
import React from "react";

const PendaftaranKelasContentMain = () => {
  const kelas = useAppSelector(state => state.persisted.kelas);

  return (
    <>
      <Text>{kelas.nama}</Text>
    </>
  );
};

export default PendaftaranKelasContentMain;