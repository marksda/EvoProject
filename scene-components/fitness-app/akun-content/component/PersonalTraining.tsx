import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import React from "react";

const PersonalTraining = () => {
    return (
        <>
            <Box className="min-h-[150px] rounded-sm shadow-sm p-2 bg-slate-100 justify-center">
                <Text size="sm" className="text-biru antialiased self-center">Anda belum memiliki sesi personal trainer</Text>
                <Button size="sm" className="self-center bg-yellow-400 mt-1">
                    <ButtonText className="color-biru">Gabung Sekarang</ButtonText>
                </Button>
            </Box>
        </>
    );
}

export default PersonalTraining;