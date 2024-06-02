import { v4 as uuidv4 } from 'uuid';
import { paletteCards, showNotification } from './domfuncs';
import { setLocalStorageKey, getLocalStorageKey } from './local-storage';

// Function to handle new palette data
export const handlePaletteData = (event) => {
    event.preventDefault();

    const form = event.target;
    const colors = [
        form.firstColor.value,
        form.secondColor.value,
        form.thirdColor.value
    ];
    const title = form.titleOfPalette.value.trim();
    const temp = form.temp.value;

    // searches for a title, if there is not return provided message
    if (!title) {
        showNotification("Try again bud... with a title name this time :)");
        return;
    }

    const uuid = uuidv4();

    const newPalette = {
        uuid,
        title: title,
        colors: colors,
        temperature: temp
    };

    const palettes = getLocalStorageKey('palettes');
    palettes.push(newPalette);
    setLocalStorageKey('palettes', palettes);
    paletteCards(newPalette);

    // start the form from scratch 
    form.reset();
};

// function to init the palette cards and if there are no palette cards return the orginal from the palettes.json file
export const initPaletteCards = (defaultPalettes) => {
    let storedPalettes = getLocalStorageKey('palettes');
    if (!storedPalettes || storedPalettes.length === 0) {
        storedPalettes = defaultPalettes;
        setLocalStorageKey('palettes', storedPalettes);
    }
    storedPalettes.forEach(paletteCards);
};
