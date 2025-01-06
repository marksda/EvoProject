import React from "react";
import { ScrollView } from "react-native";
import _ from "lodash"
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { AddIcon, Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { GlobeIcon, MapPinIcon } from "lucide-react-native";
import { Menu, MenuItem, MenuItemLabel } from "@/components/ui/menu";
import { addDays, eachDayOfInterval } from "date-fns";
const generateArrayOfDate = (startDate: Date, endDate: Date) => {   
    // let start = addDays(startDate, 1);
    // let end = addDays(endDate, 1);
    let arrayOfDate = eachDayOfInterval({start: startDate, end: endDate});

    return arrayOfDate;
}

const PemesananPersonalTrainerContentMain = () => {
    // const [showMenuPilihKlub, setShowMenuPilihKlub] = React.useState(false);
    const [startDate, setStartDate] = React.useState(new Date());
    // const [endDate, setEndDate] = React.useState(endOfMonth(addMonths(startDate, 1)));
    const [endDate, setEndDate] = React.useState(addDays(startDate, 15));
    

    const dataTanggal = React.useMemo(
        () => generateArrayOfDate(startDate, endDate),
        [startDate, endDate]
    );

    const [tmblFilterDate, setTmblFilterDate] = React.useState(dataTanggal[0]);

    const handleTmblFilterDatePress = (item: Date) => {
        let itemSelected = _.find(dataTanggal, function(itemDate) {
            return itemDate == item;
        });
        
        setTmblFilterDate(itemSelected!);
    }
    
    return (
        <>
            <ScrollView
                horizontal={false}
                scrollEventThrottle={50}
            >
                <VStack className="p-2 gap-1">  
                    <Menu
                        placement="bottom left"
                        trigger={(triggerProps) => {
                            return (
                                <Pressable 
                                    {...triggerProps}
                                    className="bg-gray-300 p-2 shadow-sm"
                                >
                                    <HStack className="gap-1">
                                        <Icon as={MapPinIcon} />
                                        <Text>- Pilih klub -</Text>
                                    </HStack>
                                </Pressable>
                            )
                        }}
                        className="top-[-22px] rounded-none shadow-none bg-slate-50"
                    >
                        <MenuItem key="Add account" textValue="Add account">
                            <Icon as={AddIcon} size="sm" className="mr-2" />
                            <MenuItemLabel size="sm">Add account</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Community" textValue="Community">
                            <Icon as={GlobeIcon} size="sm" className="mr-2" />
                            <MenuItemLabel size="sm">Community</MenuItemLabel>
                        </MenuItem>
                    </Menu>
                    <Text size="sm">Klub terpilih akan menjadi kelas dan personal trainer bawaan</Text>
                    <ScrollView
                        horizontal
                        style={{ width: "100%", marginTop: 8 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        <HStack className="gap-2">
                        {
                            dataTanggal.map((item, index) => {
                                return (
                                    <Pressable
                                        key={index}
                                        className={
                                            `shadow-sm rounded-md p-2 ${tmblFilterDate == item ? "bg-biru" : "bg-gray-300"}`
                                        }
                                        onPress={() => handleTmblFilterDatePress(item)}
                                    >
                                        <VStack>
                                            <Text 
                                                size="xs"
                                                bold={true}
                                                className={`self-center subpixel-antialiased ${tmblFilterDate == item ? "color-yellow-300" : "color-biru"}`}
                                            >
                                                {item.toLocaleString('default', { weekday: 'short' })}
                                            </Text>
                                            <Text 
                                                size="xs"
                                                className={`self-center subpixel-antialiased ${tmblFilterDate == item ? "color-yellow-500" : "color-biru"}`}
                                            >
                                                {item.toLocaleString('default', { day: '2-digit'})} {item.toLocaleString('default', { month: 'short' })}
                                            </Text>
                                        </VStack>
                                    </Pressable>
                                )
                            })
                        }
                        </HStack>
                    </ScrollView>
                </VStack>
            </ScrollView>
        </>
    );
}

export default PemesananPersonalTrainerContentMain;