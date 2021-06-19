import { useEffect, useState } from 'react';
import { setToLS, getFromLS, getFonts } from './storage';
import dataTheme from './themeData.json';

export const useTheme = () => {
    const [theme, setTheme] = useState(dataTheme.data.dark);
    const [themeLoaded, setThemeLoaded] = useState(false);

    const setMode = mode => {
        setToLS('theme', mode)
        setTheme(mode);
    };

    useEffect(() => {
        const localTheme = getFromLS('theme');
        localTheme ? setTheme(localTheme) : setTheme(dataTheme.data.dark);
        setThemeLoaded(true);
    }, []);

    return { theme, themeLoaded, setMode, getFonts };
};