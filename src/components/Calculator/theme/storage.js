import _ from 'lodash';

// store the themes in LocalStorage
export const setToLS = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
}

// retrieve the themes from LocalStorage
export const getFromLS = key => {
    const value = window.localStorage.getItem(key);

    if (value) {
        return JSON.parse(value);
    }
}
// get the fonts
export const getFonts = () => {
    const themes = getFromLS('all-themes');
    const allFonts = _.values(_.mapValues(themes.data, 'font'));
    return allFonts;
}