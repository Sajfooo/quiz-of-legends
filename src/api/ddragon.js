import { AbilityTypes } from "../enum/AbilityTypes";

const API_BASE_URL = "https://ddragon.leagueoflegends.com/cdn";

export async function fetchChampions(version = "15.7.1", language = "en_US") {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/${language}/champion.json`);
    if (!response.ok) {
        throw new Error('Failed to fetch champions');
    }
    const data = await response.json();
    return Object.keys(data.data);
}

export async function fetchChampionData(championName, version = "15.7.1", language = "en_US") {
    const response = await fetch(`${API_BASE_URL}/${version}/data/${language}/champion/${championName}.json`);
    if (!response.ok) {
        throw new Error('Failed to fetch champion data');
    }
    const data = await response.json();
    return data.data[championName];
}

export async function getImageAndData (name, details, skill, version = "15.7.1") {
    console.log(skill);
    let query = null;
    if (skill === AbilityTypes.PASSIVE) {
        const passiveName = details.passive.image.full;
        query = `${API_BASE_URL}/${version}/img/passive/${passiveName}`;
    } else {
        const skillName = details.spells[skill].image.full;
        query = `${API_BASE_URL}/${version}/img/spell/${skillName}`;
    }
    console.log(query);
    return [query, {}];
}
