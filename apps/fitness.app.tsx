import "../global.css";
import React from 'react';
import { Provider } from "react-redux";
import { persistor, store } from "@/features/ssot/fitness-redux-store";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { StatusBar } from "react-native";


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
                <GluestackUIProvider mode={colorMode}>              
                    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
                        <SafeAreaProvider>
                            <StatusBar />
                        </SafeAreaProvider>
                    </ThemeContext.Provider>
                </GluestackUIProvider>
            </PersistGate>
        </Provider>
    )
}

export default FitnessApp;
