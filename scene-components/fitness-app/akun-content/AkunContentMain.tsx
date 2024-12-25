import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const AkunContentMain = () => {
    return (
        <Box className="m-1 p-1">
            <Box className="rounded-md shadow-sm border-l-[4px] border-l-biru p-2 bg-slate-100">
                <Text size="xs">Rekomendasi teman anda dan dapatkan FW coin</Text>
                <Text size="sm" bold={true} className="text-biru antialiased">Perbarui profil anda untuk mendapatkan kode referal</Text>
            </Box>
            <Divider className="my-2"/>
            <VStack space="md">
                <HStack className="justify-between">
                    <Text size="sm" bold={true} className="text-biru antialiased">Paket</Text>
                    <Text size="sm" bold={true} className="text-biru antialiased">Lihat Paket</Text>
                </HStack>
                <HStack space="xs">
                    <Pressable className="border border-biru py-1 px-5 rounded-3xl">
                        <Text size="sm">Membership</Text>
                    </Pressable>
                    <Pressable className="bg-white border border-biru py-1 px-5 rounded-3xl">
                        <Text size="sm" className="text-biru subpixel-antialiased">Personal Training</Text>
                    </Pressable>
                </HStack>
            </VStack>
        </Box>
    );
}

export default AkunContentMain;