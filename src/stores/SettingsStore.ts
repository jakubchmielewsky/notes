import {create} from "zustand";

interface SettingsState{
    theme: string,
    font: string,
    setTheme: (option: string)=>void,
    setFont: (font: string)=>void,
    initializeSettings: ()=>void,
}

export const useSettingsStore= create<SettingsState>((set)=>({
    theme: "System",
    font: "Sans-serif",

    setTheme: (theme)=>{
        set({theme:theme});
        localStorage.setItem("theme", theme);
    },

    setFont: (font)=>{
        set({font:font});
        localStorage.setItem("font", font);
    },

    initializeSettings: () => {
        const themeSetting = localStorage.getItem("theme");
        const fontSetting = localStorage.getItem("font");
        if (themeSetting&&fontSetting) {
            set({theme:themeSetting,font:fontSetting});
        }
        
    }

}))