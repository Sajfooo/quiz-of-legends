import React, { createContext, useContext, useState } from "react";

// Tworzymy kontekst
const ConfigContext = createContext();

export function useConfig() {
    return useContext(ConfigContext);
}

// Provider kontekstu
export function ConfigProvider({ children }) {
    const [config, setConfig] = useState({
        apiUrl: "https://example.com/api",
        appName: "MyApp",
        ddragon: {
            version: "15.7.1",
            language: "en_US"
        }
  });

    // Możesz dodać funkcje, które pozwalają modyfikować config
    const updateConfig = (newConfig) => {
        setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
    };

    return (
        <ConfigContext.Provider value={{ config, updateConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}