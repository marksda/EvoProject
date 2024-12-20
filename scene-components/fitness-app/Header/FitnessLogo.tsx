import { ThemeContext } from "@/apps/fitness.app";
import { Image } from "@/components/ui/image";
import { useContext } from "react";

const FitnessLogo = () => {
    const { colorMode } = useContext(ThemeContext);
    return (
      <Image
        source={
          colorMode === "light"
            ? require("../../../assets/light-logo.svg")
            : require("../../../assets/dark-logo.svg")
        }
        alt="homestaylogo"
        className="h-[42px] w-[142px]"
      />
    );
  };
  
  export default FitnessLogo;