import React from 'react';
import useTheme from '../context/theme';

export default function ThemeBtn() {
  const { themeMode, lightTheme, darkTheme } = useTheme();

  const onChangeButton = (e: React.ChangeEvent<HTMLInputElement>) => {
    const darkModeStatus = e.currentTarget.checked;
    darkModeStatus ? darkTheme() : lightTheme();
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={onChangeButton}
        checked={themeMode === "dark"} 
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gradient-to-r from-emerald-500 to-teal-500"></div>
    </label>

  );
}
