import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React from "react";
import { ScrollView } from "react-native";
import _ from "lodash"

const dataFilter = [
    {
        id: '01',
        nama: 'All'
    },
    {
        id: '02',
        nama: 'Booked'
    },
    {
        id: '03',
        nama: 'Ongoing'
    },
    {
        id: '04',
        nama: 'Waiting List'
    },
    {
        id: '05',
        nama: 'Cancel'
    },
    {
        id: '06',
        nama: 'Done'
    },
];

const PemesananKelasContentMain = () => {
    // const scrollViewRef = React.useRef(null);
    const [tmblFilter, setTmblFilter] = React.useState({
        id: '01',
        nama: 'All'
    });

    const handleTmblFilterPress = (id: string) => {
        let itemSelected = _.find(dataFilter, function(item) {
            return item.id == id;
        });
        
        setTmblFilter(itemSelected!);
    }

    return (
        <>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={50}
                className="py-1"
            >
                <HStack space="sm" className="w-full px-1 md:px-0">
                {dataFilter.map((item) => {
                    return (
                        <Pressable
                            key={item.id}
                            className={
                                `h-8 border ${tmblFilter.id == item.id ? "bg-biru" : "bg-gray-400"} border-0 py-1 px-2 rounded-lg`
                            }
                            onPress={() => handleTmblFilterPress(item.id)}
                        >
                            <Text 
                                size="sm" 
                                className="text-white subpixel-antialiased"
                            >
                                {item.nama}
                            </Text>
                        </Pressable>
                    )
                })}   
                </HStack>
            </ScrollView>
        </>
    );
}

export default PemesananKelasContentMain;