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

const AkunContentMain = () => {
    const [tmblPaket, setTmblPaket] = React.useState('membership');
    const [actionsheetDetailPaketVisible, setActionsheetDetailPaketVisible] = React.useState(false);
    
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
                                setActionsheetDetailPaketVisible((prev) => !prev);
                            }}
                        >
                            <Text size="sm" bold={true} className="text-biru antialiased">Lihat Paket</Text>
                        </Pressable>
                    </HStack>
                    <HStack space="xs">
                        <Pressable 
                            className={
                                `${tmblPaket == 'membership' ? "border bg-biru py-1 px-5 rounded-3xl" : "bg-white border border-biru py-1 px-5 rounded-3xl"}`
                            }
                            onPress={() => {
                                setTmblPaket('membership');
                            }}
                        >
                            <Text 
                                size="sm" 
                                className={
                                    `${tmblPaket == 'membership' ? 'text-white': 'text-biru subpixel-antialiased'}`
                                }
                            >
                                Membership
                            </Text>
                        </Pressable>
                        <Pressable 
                            className={
                                `${tmblPaket == 'personaltraining' ? "border bg-biru py-1 px-5 rounded-3xl" : "bg-white border border-biru py-1 px-5 rounded-3xl"}`
                            }
                            onPress={() => {
                                setTmblPaket('personaltraining');
                            }}
                        >
                            <Text 
                                size="sm" 
                                className={
                                    `${tmblPaket == 'personaltraining' ? 'text-white': 'text-biru subpixel-antialiased'}`
                                }
                            >
                                Personal Training
                            </Text>
                        </Pressable>
                    </HStack>
                    <MembershipCard />
                    <Divider className="my-2"/>
                    <Text size="sm" bold={true} className="antialiased text-biru">Aktifitas</Text>
                    <AccordionBox title="Pemesanan Kelas" variant="Kuning"/>
                    <AccordionBox title="Pemesanan Personal Trainer" variant="Kuning"/>
                    <AccordionBox title="Tugas Harian" variant="Kuning"/>
                    <Divider className="my-2"/>
                    <Text size="sm" bold={true} className="antialiased text-biru">Riwayat</Text>
                    <AccordionBox title="Riwayat" variant="Biru"/>
                    <AccordionBox title="Tagihan" variant="Biru"/>
                    <AccordionBox title="Bonus" variant="Biru"/>
                    <Divider className="my-2"/>
                    <AccordionBox title="Pengaturan" variant="Merah"/>
                    <AccordionBox title="Keluar" variant="Merah"/>
                </VStack>
            </Box>
            <MobileSidebarActionsheet
                actionsheetVisible={actionsheetDetailPaketVisible}
                setActionsheetVisible={setActionsheetDetailPaketVisible}
            />
      </>
    );
}

export default AkunContentMain;