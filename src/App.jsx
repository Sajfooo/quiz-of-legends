import { useEffect, useState } from "react";
import { useConfig } from "./store/Store";
import { AbilityTypes } from "./enum/AbilityTypes";
import { fetchChampionData, fetchChampions, getImageAndData } from "./api/ddragon";

function App() {
    const [message, setMessage] = useState("Hello World!");
    const [imageUrl, setImageUrl] = useState(null);
    const { config, updateConfig } = useConfig();
    const version = config.ddragon.version;
    const language = config.ddragon.language;
    
    function getRandomElementFromList(list) {
        if (!Array.isArray(list) || list.length === 0) {
            throw new Error("Input must be a non-empty array");
        }
        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }

    function getRandomSkill() {
        const abilities = Object.values(AbilityTypes); 
        const randomIndex = Math.floor(Math.random() * abilities.length); 
        return abilities[randomIndex]; 
    }

    // Przykład: pobranie listy championów z DDragon (opcjonalnie)
    useEffect(() => {
        fetchChampions(version, language).then(champions => {
            const champion = getRandomElementFromList(champions);
            fetchChampionData(champion).then(details => {
                const randomSkill = getRandomSkill();
                getImageAndData(champion, details, randomSkill, version).then(([query, data]) => {
                    setImageUrl(query);
                });
            });
        });

    }, []);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold">{message}</h1>
            {imageUrl ? (
                <img src={imageUrl} alt="Pobrany obrazek" />
            ) : (
                <p>Ładowanie obrazu...</p>
            )}
        </div>
    );
}

export default App;
