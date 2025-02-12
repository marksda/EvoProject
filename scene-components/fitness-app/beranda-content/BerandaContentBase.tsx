import React, { useState } from "react";
import BerandaContentHeader from "./BerandaContentHeader";
import BerandaContentMain from "./BerandaContentMain";
import MobileGeolocationActionsheet from "../MobileGeolocationActionsheet";

const BerandaContentBase = () => {
  const [showGeolocationActionSheet, setShowGeolocationActionSheet] = useState(false);

  return (
    <>
      <BerandaContentHeader setActionsheetVisible={setShowGeolocationActionSheet} />
      <BerandaContentMain />
      <MobileGeolocationActionsheet
        actionsheetVisible={showGeolocationActionSheet}
        setActionsheetVisible={setShowGeolocationActionSheet}
      />
    </>
  );
}

export default BerandaContentBase;