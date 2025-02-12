import { Box } from "@/components/ui/box";
import { 
    Home, 
    Fence,
    IdCard, 
    User 
} from "lucide-react-native";
import MobileBottomTabs from "./MobileBottomTabs";
import React, { useCallback, useEffect, useState } from "react";
import BerandaPage from "./BerandaPage";
import AkunPage from "./AkunPage";
import { useAppDispatch, useAppSelector } from "@/features/ssot/hook";
import { useNavigation } from "@react-navigation/native";
import { setBottomTab } from "@/services/fitness-app/bottom-tab-slice";
import KelasPage from "./KelasPage";
import Geolocation from "@react-native-community/geolocation";


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
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.persisted.token);
  const bottom_tab = useAppSelector(state => state.persisted.bottom_tab);
  const navigation = useNavigation();

  const [skipPermissionGeolocationRequests, setSkipPermissionGeolocationRequests] = useState(false);
  // IOS only
  const [authorizationGeolocationLevel, setAuthorizationGeolocationLevel] = useState<'whenInUse' | 'always' | 'auto'>('auto');
  // Android only
  const [geolocationProvider, setgeolocationProvider] = useState<'playServices' | 'android' | 'auto'>('auto');
  // IOS only
  const [enableBackgroundGeolocationUpdates, setEnableBackgroundGeolocationUpdates] = useState(false);

  useEffect(
    () => {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: skipPermissionGeolocationRequests,
        authorizationLevel: authorizationGeolocationLevel,
        enableBackgroundLocationUpdates: enableBackgroundGeolocationUpdates,
        locationProvider: geolocationProvider,
      });
    },
    [skipPermissionGeolocationRequests, authorizationGeolocationLevel, geolocationProvider, enableBackgroundGeolocationUpdates]
  );

  const handleActiveTabChange = useCallback(
    (id: string) => {
      if(id == "Akun") {
        if(token.token != null) {
          dispatch(setBottomTab(id));
        } 
        else {
          // @ts-ignore: Unreachable code error
          navigation.navigate("submain", {id: "Login"});
        }
      }
      else {
        dispatch(setBottomTab(id));
      }
    },
    [token, bottom_tab]
  );

  return (
    <>
      <Box className="w-full flex-1 pb-1">
        <BerandaPage  isActive={bottom_tab === "Beranda"} activeTab={bottom_tab} />
        <KelasPage isActive={bottom_tab === "Kelas"} />
        <AkunPage isActive={bottom_tab === "Akun"} />
      </Box>
      <Box className="h-16">
        <MobileBottomTabs
          activeTab={bottom_tab}
          setActiveTab={handleActiveTabChange}
          bottomTabs={bottomTabs}
        />
      </Box>
    </>
  );
}

export default BasePage;