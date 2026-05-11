import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
