import { create } from 'zustand';

const useStore = create((set) => ({
    ddragon: {
        version: "15.7.1",
        language: "en_US",
        setDdragonVersion: (version) => set({ version: version }),
        setDdragonLanguage: (lang) => set({ language: lang }),
    },
    imageUrl: null,
    setImageUrl: (url) => set({ imageUrl: url }),
}));

export default useStore;