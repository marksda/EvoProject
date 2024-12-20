import { HStack } from "@/components/ui/hstack";
import { Link, LinkText } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

const Banner = () => {
    return (
        <HStack
            className="justify-center items-center min-h-16 bg-shade-0"
            space="sm"
        >
            <Text className="text-content-0" size="sm">
                Show total prices up front
            </Text>
            <Link href="https://ui.gluestack.io">
                <LinkText className="text-content-50 font-semibold" size="sm">
                Learn more
                </LinkText>
            </Link>
        </HStack>
    )
}

export default Banner;