import React from "react";
import { ImageBackground } from "react-native";

const MembershipCard = () => {
    return (
        <>
            <ImageBackground
                source={require('../../../../assets/bg_card.png')}
                className="h-[150px] flex-1"
            >

            </ImageBackground>
        </>
    );
}

export default MembershipCard;