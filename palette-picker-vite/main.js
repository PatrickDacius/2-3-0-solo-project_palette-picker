import './style.css';
import palettes from '../palettes.json';
import { setLocalStorageKey, getLocalStorageKey } from './local-storage';
import { initPaletteCards, handlePaletteData } from './eventfuncs';

if (!getLocalStorageKey('palettes')) {
  setLocalStorageKey('palettes', palettes);
}


initPaletteCards(palettes);


document.querySelector('#palette-picker').addEventListener('submit', handlePaletteData);

console.log(getLocalStorageKey('palettes'));
