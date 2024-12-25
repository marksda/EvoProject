import "../global.css";
import React from 'react';
import { Provider } from "react-redux";
import { persistor, store } from "@/features/ssot/fitness-redux-store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "react-native";
import BasePage from "@/scene-components/fitness-app/BasePage";


let defaultTheme: "dark" | "light" = "light";

type ThemeContextType = {
    colorMode?: "dark" | "light";
    toggleColorMode?: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
    colorMode: "light",
    toggleColorMode: () => {},
});
  
const FitnessApp = (): React.JSX.Element => { 
    const [colorMode, setColorMode] = React.useState<"dark" | "light">(
        defaultTheme
    );
    
    const toggleColorMode = async () => {
        setColorMode((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>                             
                <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
                    <GluestackUIProvider mode={colorMode}>   
                        <SafeAreaProvider
                            className={`${
                                colorMode === "light" ? "bg-white" : "bg-[#171717]"
                            } flex-1 overflow-hidden`}
                        >
                            <BasePage />
                        </SafeAreaProvider>
                    </GluestackUIProvider>
                </ThemeContext.Provider>                
            </PersistGate>
        </Provider>
    )
}

export default FitnessApp;

