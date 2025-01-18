import { createTheme } from '@mui/material/styles';
import customColors from './customColors'; 

const theme = createTheme({
  custom: {
    main: customColors.primaryMain,
    secondary: customColors.secondaryMain,
  },
  palette: {
    primary: {
      main: customColors.primaryMain,
    },
    secondary: {
      main: customColors.secondaryMain,
    },
    warning: {
      main: customColors.progressMain,
      dark: customColors.progressDark,
      light: customColors.progressLight
    },
    success: {
      main: customColors.doneMain,
      dark:customColors.doneDark,
      light: customColors.doneLight
    },
    error: {
      main: customColors.reviewMain,
      dark: customColors.reviewDark,
      light: customColors.reviewlight
    },
    info: {
      main: customColors.openMain,
      dark: customColors.openDark,
      light: customColors.openLight,
    },
    background: {
      default: customColors.backgroundDefault,
    },
    text: {
      primary: customColors.textPrimary,
      secondary: customColors.textSecondary,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
