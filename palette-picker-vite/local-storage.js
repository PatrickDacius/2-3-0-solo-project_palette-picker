// Basically a built in console.log command, stores all information/ going into browsers memory

export const setLocalStorageKey = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageKey = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (err) {
        console.error(err);
        return null;
    }
}




