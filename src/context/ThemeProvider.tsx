import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { PaletteMode } from '@mui/material';
import useColorMode from '../hooks/useColorMode';

interface ThemeContextType {
    mode: PaletteMode;
    setMode: (mode: PaletteMode) => void;
  }

export const ThemeContext = createContext<ThemeContextType>({ mode: 'light', setMode: () => {} });

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [colorMode, setColorMode] = useColorMode();

console.log('colorMode===',colorMode)


  // Initialize mode state with 'light' as default value
  const [mode, setMode] = useState<string>(colorMode);

  // Create an object containing mode and toggleMode function
  const contextValue: ThemeContextType = { mode, setMode };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
