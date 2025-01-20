import { Box } from "@/components/ui/box"
import PengaturanContentHeader from "./PengaturanContentHeader";
import PengaturanContentMain from "./PengaturanContentMain";
import React from "react";

const PengaturanContentBase = () => {

  return (
    <>
      <PengaturanContentHeader />
      <PengaturanContentMain />
    </>
  );
}

export default PengaturanContentBase;