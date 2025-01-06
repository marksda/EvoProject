import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React from "react";
import { ScrollView } from "react-native";
import _ from "lodash"

const dataFilter = [
    {
        id: '01',
        nama: 'Transaksi'
    },
    {
        id: '02',
        nama: 'Cek in'
    },
    {
        id: '03',
        nama: 'Sesi PT'
    },
    {
        id: '04',
        nama: 'Paket'
    },
    {
        id: '05',
        nama: 'Bonus'
    },
];

const RiwayatContentMain = () => {
    const [tmblFilter, setTmblFilter] = React.useState(dataFilter[0]);

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

export default RiwayatContentMain;