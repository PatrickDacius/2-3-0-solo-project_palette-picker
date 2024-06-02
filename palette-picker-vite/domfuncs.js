import { setLocalStorageKey, getLocalStorageKey } from './local-storage';

// Function to create palette cards
export const paletteCards = (paletteInfo) => {
    const { uuid, title, colors, temperature } = paletteInfo;

    const paletteContainer = document.createElement('li');
    paletteContainer.setAttribute('data-uuid', uuid);
    const paletteHeading = document.createElement('div');
    const heading = document.createElement('h3');
    paletteHeading.setAttribute('id', 'palette-name');
    const headingDiv = document.createElement('div');
    headingDiv.setAttribute('id', 'heading-div');

    // To create the two different colors for the text "Text|Example"
    const paletteOneTxt = document.createElement('p');
    const paletteOneTxt2 = document.createElement('p');
    paletteOneTxt.setAttribute('class', 'str');
    paletteOneTxt2.setAttribute('class', 'text-str');

    const paletteTwoTxt = document.createElement('p');
    const paletteTwoTxt2 = document.createElement('p');
    paletteTwoTxt.setAttribute('class', 'str');
    paletteTwoTxt2.setAttribute('class', 'text-str');

    const paletteThreeTxt = document.createElement('p');
    const paletteThreeTxt2 = document.createElement('p');
    paletteThreeTxt.setAttribute('class', 'str');
    paletteThreeTxt2.setAttribute('class', 'text-str');

    const textExampleContainerOne = document.createElement('div');
    const textExampleContainerTwo = document.createElement('div');
    const textExampleContainerThree = document.createElement('div');

    const cardSectionOne = document.createElement('div');
    cardSectionOne.setAttribute('id', 'palette-heading1');

    const paletteOneButton = document.createElement('button');
    paletteOneButton.setAttribute('class', 'button-class');

    const colorTwoContainer = document.createElement('div');
    colorTwoContainer.setAttribute('id', 'palette-heading2');

    const paletteTwoButton = document.createElement('button');
    paletteTwoButton.setAttribute('class', 'button-class');

    const colorThreeContainer = document.createElement('div');
    colorThreeContainer.setAttribute('id', 'palette-heading3');

    const paletteThreeButton = document.createElement('button');
    paletteThreeButton.setAttribute('class', 'button-class');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Palette";
    deleteButton.setAttribute('class', 'delete-button');
    deleteButton.addEventListener('click', () => deletePalette(uuid));

    const temperatureDiv = document.createElement('div');

    textExampleContainerOne.append(paletteOneTxt, paletteOneTxt2);
    textExampleContainerOne.setAttribute('class', 'holder-of-txt');

    textExampleContainerTwo.append(paletteTwoTxt, paletteTwoTxt2);
    textExampleContainerTwo.setAttribute('class', 'holder-of-txt');

    textExampleContainerThree.append(paletteThreeTxt, paletteThreeTxt2);
    textExampleContainerThree.setAttribute('class', 'holder-of-txt');

    textExampleContainerOne.style.backgroundColor = colors[0];
    textExampleContainerTwo.style.backgroundColor = colors[1];
    textExampleContainerThree.style.backgroundColor = colors[2];

    cardSectionOne.append(paletteHeading, textExampleContainerOne, paletteOneButton);
    colorTwoContainer.append(textExampleContainerTwo, paletteTwoButton);
    colorThreeContainer.append(textExampleContainerThree, paletteThreeButton);

    headingDiv.append(heading);
    paletteContainer.append(headingDiv, cardSectionOne, colorTwoContainer, colorThreeContainer, deleteButton, temperatureDiv);
    paletteHeading.append(heading);

    headingDiv.textContent = title;

    paletteOneTxt.textContent = 'Text';
    paletteOneTxt2.textContent = 'Example';
    paletteOneButton.textContent = 'copy' + colors[0];
    paletteOneButton.addEventListener('click', (event) => colorCopy(event, colors[0]));

    paletteTwoTxt.textContent = 'Text';
    paletteTwoTxt2.textContent = 'Example';
    paletteTwoButton.textContent = 'copy' + colors[1];
    paletteTwoButton.addEventListener('click', (event) => colorCopy(event, colors[1]));

    paletteThreeTxt.textContent = 'Text';
    paletteThreeTxt2.textContent = 'Example';
    paletteThreeButton.textContent = 'copy' + colors[2];
    paletteThreeButton.addEventListener('click', (event) => colorCopy(event, colors[2]));

    temperatureDiv.setAttribute('class', 'temp-color');

    temperatureDiv.textContent = temperature;
    if (temperature === 'warm') {
        temperatureDiv.style.backgroundColor = '#431212';
    } else if (temperature === 'neutral') {
        temperatureDiv.style.backgroundColor = '#555555';
    } else if (temperature === 'cool') {
        temperatureDiv.style.backgroundColor = '#121e43';
    }

    document.querySelector("#palette-cards").append(paletteContainer);
};

export const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
};

export const colorCopy = (event, color) => {
    navigator.clipboard.writeText(color).then(() => {
        showNotification(`Copied hex! : ${color}`);
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
};

// Function to delete a palette
export const deletePalette = (uuid) => {
    const paletteContainer = document.querySelector(`[data-uuid="${uuid}"]`);
    if (paletteContainer) {
        paletteContainer.remove();
    }

    // Remove from palettes array
    const palettes = getLocalStorageKey('palettes');
    const paletteIndex = palettes.findIndex(palette => palette.uuid === uuid);
    if (paletteIndex !== -1) {
        palettes.splice(paletteIndex, 1);
        setLocalStorageKey('palettes', palettes);
    }
};
