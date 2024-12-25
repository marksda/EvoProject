import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import React from "react";

const AkunContentMain = () => {
    return (
        <Box className="m-1 p-1">
            <Box className="rounded-md shadow-sm border-l-[4px] border-l-biru p-2 bg-slate-100">
                <Text size="xs">Rekomendasi teman anda dan dapatkan FW coin</Text>
                <Text size="sm" bold={true} className="text-biru antialiased">Perbarui profil anda untuk mendapatkan kode referal</Text>
            </Box>
            <Divider className="my-2"/>
        </Box>
    );
}

export default AkunContentMain;