// import { ThemeContext } from "@/apps/fitness.app";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const MobileBottomTabs = ({ bottomTabs, activeTab, setActiveTab }: any) => {

  return (
    <HStack className="bg-background-color content-center absolute bottom-0 justify-between w-full py-3 px-6 rounded-t-2xl md:hidden">
    {
      bottomTabs.map((tab: any) => {
          return (
              <Pressable
                  key={tab.label}
                  onPress={() => {
                      setActiveTab(tab.label);
                  }}
                  disabled={tab.disabled}
                  //@ts-ignore
                  opacity={tab.disabled ? 0.5 : 1}
              >
                  <VStack className="items-center">
                      <Icon
                          as={tab.icon}
                          size="xl"
                          className={`${
                              activeTab === tab.label
                              ? "text-yellow-400"
                              : "text-typography-400"
                          }`}
                      />
                      <Text
                          size="sm"
                          className={`${
                              activeTab === tab.label
                              ? "text-yellow-400"
                              : "text-typography-400"
                          }`}
                          >
                          {tab.label}
                      </Text>
                  </VStack>
              </Pressable>
          )
      })
    }
    </HStack>
  );
}

export default MobileBottomTabs;