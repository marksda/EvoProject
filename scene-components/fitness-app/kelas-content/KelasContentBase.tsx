import { useAppSelector } from "@/features/ssot/hook";
import LoginForm from "../formulir/LoginForm";
import React from "react";
import KelasContentHeader from "./KelasContentHeader";

const KelasContentBase = () => {
  const token = useAppSelector(state => state.persisted.token);

  return token.token == null ? 
  <LoginForm />
  : (
      <>
        <KelasContentHeader />
        {/* <KelasContentMain /> */}
      </>
  );
}

export default KelasContentBase;