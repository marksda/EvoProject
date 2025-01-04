import { Box } from "@/components/ui/box";
import React from "react";
import PemesananKelasContentBase from "./akun-content/PemesananKelasContentBase";
import { StaticScreenProps } from "@react-navigation/native";
import PemesananPersonalTrainerContentBase from "./akun-content/PemesananPersonalTrainerContentBase";

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
        </Box>
    );
}

export default BaseDetailPage;