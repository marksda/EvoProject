import { Box } from "@/components/ui/box";
import { 
    Home, 
    Fence,
    IdCard, 
    User 
} from "lucide-react-native";
import MobileBottomTabs from "./MobileBottomTabs";
import React, { useCallback } from "react";
import BerandaPage from "./BerandaPage";
import AkunPage from "./AkunPage";
import { useAppSelector } from "@/features/ssot/hook";
import { useNavigation } from "@react-navigation/native";


const bottomTabs = [
    {
      icon: Home,
      label: "Beranda",
    },
    {
      icon: IdCard,
      label: "Membership",
    },
    {
      icon: Fence,
      label: "Kelas",
    },
    {
      icon: User,
      label: "Akun",
    },
];

const BasePage = () => {
  const token = useAppSelector(state => state.persisted.token);
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState("Beranda");

  const handleActiveTabChange = useCallback(
    (id: string) => {
      if(id == "Akun") {
        if(token.token != null) {
          setActiveTab(id);
        } 
        else {
          // @ts-ignore: Unreachable code error
          navigation.navigate("submain", {id: "Login"});
        }
      }
      else {
        setActiveTab(id);
      }
    },
    [token]
  );

  return (
    <Box className="flex-1">
      <Box className="flex-1">
        <BerandaPage  isActive={activeTab === "Beranda"} setActiveTab={setActiveTab} activeTab={activeTab} />
        <AkunPage isActive={activeTab === "Akun"} />
      </Box>
      <Box className="h-[52px] items-center w-full flex">
          <MobileBottomTabs
            activeTab={activeTab}
            setActiveTab={handleActiveTabChange}
            bottomTabs={bottomTabs}
          />
      </Box>
    </Box>
  );
}

export default BasePage;