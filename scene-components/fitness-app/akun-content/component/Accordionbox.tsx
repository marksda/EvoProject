import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

const AccordionBox = ({ setActiveTab, activeTab }: any) => {
    return (
        <Pressable>
            <HStack className="rounded-md shadow-sm border-l-[4px] border-l-biru p-4 bg-slate-100 justify-between">
                <Text size="sm" bold={true} className="text-biru antialiased">Paket</Text>
                <Text size="sm" bold={true} className="text-biru antialiased">Lihat Paket</Text>
            </HStack>
        </Pressable>
    );
}

export default AccordionBox;