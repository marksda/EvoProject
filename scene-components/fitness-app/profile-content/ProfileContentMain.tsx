import { VStack } from "@/components/ui/vstack";
import React from "react";
import { ScrollView } from "react-native";

const ProfileContentMain = () => {
  return (
    <>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={50}
        className="pt-1"
      >
        <VStack>

        </VStack>
      </ScrollView>
    </>
  );
}

export default ProfileContentMain;