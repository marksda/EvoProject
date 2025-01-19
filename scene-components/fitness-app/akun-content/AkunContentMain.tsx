import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import MembershipCard from "./component/MembershipCard";
import AccordionBox from "./component/Accordionbox";
import MobileSidebarActionsheet from "../MobileSidebarActionsheet";
import PersonalTraining from "./component/PersonalTraining";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Icon } from "@/components/ui/icon";
import { TriangleAlertIcon } from "lucide-react-native";
import { useAppSelector } from "@/features/ssot/hook";

const exitApp = () => {
    BackHandler.exitApp();
}

const AkunContentMain = () => {
  const token = useAppSelector(state => state.persisted.token);
  const navigation = useNavigation();
  const [tmblPaket, setTmblPaket] = React.useState('membership');
  const [showDetailPaket, setShowDetailPaket] = React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false)

  const handleAcordionBoxPress = (id: string) => {
    switch (id) {
      case "Tugas Harian":
        setShowAlertDialog(true);
        break;    
      case "Keluar":
        exitApp();
        break;               
      default:
        // @ts-ignore: Unreachable code error
        navigation.navigate("submain", { id });
        break;
    }
  };

  const handleCloseAlertDialog = () => setShowAlertDialog(false);
    
  return (
    <>
      <Box className="m-1 p-1">
          <Box className="rounded-md shadow-sm border-l-[4px] border-l-biru p-2 bg-slate-100">
              <Text size="xs">Rekomendasi teman anda dan dapatkan FW coin</Text>
              <Text size="sm" bold={true} className="text-biru antialiased">Perbarui profil anda untuk mendapatkan kode referal</Text>
          </Box>
          <Divider className="my-2"/>
          <VStack space="md">
              <HStack className="justify-between">
                  <Text size="sm" bold={true} className="text-biru antialiased">Paket</Text>
                  <Pressable
                      onPress={() => {
                        setShowDetailPaket((prev) => !prev);
                      }}
                  >
                      <Text size="sm" bold={true} className="text-biru antialiased">Lihat Paket</Text>
                  </Pressable>
              </HStack>
              <HStack space="xs">
                  <Pressable 
                      className={
                          `border ${tmblPaket == "membership" ? "bg-biru" : "bg-white border-biru"} py-1 px-5 rounded-3xl`
                      }
                      onPress={() => {
                          setTmblPaket('membership');
                      }}
                  >
                      <Text 
                          size="sm" 
                          className={
                              `${tmblPaket == "membership" ? "text-white": "text-biru"} subpixel-antialiased`
                          }
                      >
                          Membership
                      </Text>
                  </Pressable>
                  <Pressable 
                      className={
                          `border ${tmblPaket == 'personaltraining' ? "bg-biru" : "bg-white border border-biru"} py-1 px-5 rounded-3xl`
                      }
                      onPress={() => {
                          setTmblPaket('personaltraining');
                      }}
                  >
                      <Text 
                          size="sm" 
                          className={
                              `${tmblPaket == 'personaltraining' ? 'text-white': 'text-biru'} subpixel-antialiased`
                          }
                      >
                          Personal Training
                      </Text>
                  </Pressable>
              </HStack>
              {
                tmblPaket == "membership" ? <MembershipCard /> : <PersonalTraining />
              }
              <Divider className="my-2"/>
              <Text size="sm" bold={true} className="antialiased text-biru">Aktifitas</Text>
              <AccordionBox 
                  title="Pemesanan Kelas" 
                  variant="Kuning"
                  setActionPress={handleAcordionBoxPress}
              />
              <AccordionBox 
                  title="Pemesanan Personal Trainer" 
                  variant="Kuning"
                  setActionPress={handleAcordionBoxPress}
              />
              <AccordionBox 
                  title="Tugas Harian" 
                  variant="Kuning"
                  setActionPress={handleAcordionBoxPress}
              />
              <Divider className="my-2"/>
              <Text size="sm" bold={true} className="antialiased text-biru">Riwayat</Text>
              <AccordionBox 
                  title="Riwayat" 
                  variant="Biru"
                  setActionPress={handleAcordionBoxPress}
              />
              <AccordionBox 
                  title="Tagihan" 
                  variant="Biru"
                  setActionPress={handleAcordionBoxPress}
              />
              <AccordionBox 
                  title="Bonus" 
                  variant="Biru"
                  setActionPress={handleAcordionBoxPress}
              />
              <Divider className="my-2"/>
              <AccordionBox 
                  title={token.token != null ? 'Pengaturan' : 'Buat Akun'}
                  variant="Merah"
                  setActionPress={handleAcordionBoxPress}
              />
              <AccordionBox 
                  title="Keluar" 
                  variant="Merah"
                  setActionPress={handleAcordionBoxPress}
              />
          </VStack>
      </Box>
      <MobileSidebarActionsheet
        actionsheetVisible={showDetailPaket}
        setActionsheetVisible={setShowDetailPaket}
      />
      <AlertDialog
          isOpen={showAlertDialog} 
          onClose={handleCloseAlertDialog} 
          size="md"
      >
          <AlertDialogBackdrop />
          <AlertDialogContent>
              <AlertDialogBody className="mt-3 mb-4">
                  <VStack space="md">
                      <Icon 
                          as={TriangleAlertIcon} 
                          // @ts-ignore
                          size={48} 
                          className="color-yellow-400 self-center"
                      />
                      <Text size="sm" bold={true} className="text-center">
                          Fitur belum tersedia, tunggu kehadirannya sebentar lagi.
                      </Text>
                  </VStack>
              </AlertDialogBody>
          </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AkunContentMain;