import { ThemeContext } from "@/apps/fitness.app";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { useContext } from "react";

const ToggleMode = () => {
    const { colorMode, toggleColorMode } = useContext(ThemeContext);
    return (
      <Pressable onPress={toggleColorMode}>
        <Icon
          as={colorMode === "dark" ? SunIcon : MoonIcon}
          size="xl"
          className="stroke-background-700 fill-background-700"
        />
      </Pressable>
    );
  };
  
  export default ToggleMode;