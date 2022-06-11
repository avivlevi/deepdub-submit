import { parse } from 'node-webvtt';

const vttToArray = async (filePath) => {
    try {
        const res = await fetch(filePath);

        const text = await res.text();
        const parsed = parse(text);

        return parsed;

    } catch (error) {
        console.log('error parsing vtt file', error);

        return false
    }
}

const getCharactersJSON = async () => {
    try {
        const res = await fetch('/characters.json');

        const json = await res.json();

        return json;

    } catch (error) {
        console.log('error getting characters json', error);

        return false
    }
}


export {
    vttToArray,
    getCharactersJSON
}