import { Box } from "@/components/ui/box";
import React from "react";
import PemesananKelasContentBase from "./akun-content/PemesananKelasContentBase";
import { StaticScreenProps } from "@react-navigation/native";
import PemesananPersonalTrainerContentBase from "./akun-content/PemesananPersonalTrainerContentBase";
import RiwayatContentBase from "./akun-content/RiwayatContentBase";
import TagihanContentBase from "./akun-content/TagihanContentBase";
import BonusContentBase from "./akun-content/BonusContentBase";
import PengaturanContentBase from "./akun-content/PengaturanContentBase";

type Props = StaticScreenProps<{
    id: string;
}>;

const BaseDetailPage= ({ route }: Props) => {
    const { id } = route.params;


    return (
        <Box className="flex-1 md:h-[calc(100vh-144px)] md:pr-16 md:pl-8 overflow-auto">
            {(id == "Pemesanan Kelas") && (
                <PemesananKelasContentBase />
            )}
            {(id == "Pemesanan Personal Trainer") && (
                <PemesananPersonalTrainerContentBase />
            )}
            {(id == "Riwayat") && (
                <RiwayatContentBase />
            )}
            {(id == "Tagihan") && (
                <TagihanContentBase />
            )}
            {(id == "Bonus") && (
                <BonusContentBase />
            )}
            {(id == "Pengaturan") && (
                <PengaturanContentBase />
            )}
        </Box>
    );
}

export default BaseDetailPage;