import { HStack } from "@/components/ui/hstack";
import { ChevronRightIcon, Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

interface IAccordionBoxProp {
    title: string; 
    variant: keyof typeof variantStyles;
    setActionPress: (id: string) => void
}

const variantStyles  = {
    Biru: "border-l-biru",
    Kuning: "border-l-yellow-400",
    Merah: "border-l-red-700",
}

const AccordionBox = ({ title, variant, setActionPress}: IAccordionBoxProp) => {

    return (
        <Pressable onPress={() => setActionPress(title)}>
            <HStack className={`${variantStyles[variant]} rounded-md shadow-sm border-l-[4px] p-4 bg-slate-100 justify-between`}>
                <Text size="sm" bold={true} className="text-biru antialiased">{title}</Text>
                <Icon as={ChevronRightIcon} size="sm" className="mt-1 text-biru" />
            </HStack>
        </Pressable>
    );
}

export default AccordionBox;