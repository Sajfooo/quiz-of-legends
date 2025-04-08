import { useEffect, useState } from "react";
import { useConfig } from "./store/Store";
import { AbilityTypes } from "./enum/AbilityTypes";

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
        async function fetchChampions() {
            try {

                const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
                const data = await response.json();
                // console.log("Champions:", Object.keys(data.data)); // wypisz listę championów w konsoli
                return Object.keys(data.data);
            } catch (error) {
                console.error("Error fetching champions:", error);
            }
            return null;
        }

        async function getChampionDetails(championName) {
            const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion/${championName}.json`);
            const data = await response.json();

            return data.data;
        }

        async function getImageAndData (name, details, skill) {
            console.log(skill);
            let query = null;
            if (skill === AbilityTypes.PASSIVE) {
                const passiveName = details[name].passive.image.full;
                console.log("passive name: ", passiveName)
                query = `https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${passiveName}`;

            } else {

                const skillName = details[name].spells[skill].image.full;
                console.log("skill name: ", skillName)
                query = `https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${skillName}`;
            }
            setImageUrl(query);

            return query, {};
        }

        fetchChampions().then(champions => {
            const champion = getRandomElementFromList(champions);
            getChampionDetails(champion).then(details => {
                const randomSkill = getRandomSkill();
                getImageAndData(champion, details, randomSkill).then(imageurl, data => {

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
