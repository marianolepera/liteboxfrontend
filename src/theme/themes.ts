import { createTheme } from "@mui/material/styles";


const theme = createTheme({
  palette: {
    secondary: {
      main: "#242424",
      contrastText: "white"
    },
    custom: {
      main: "#64EEBC",
    //   contrastText: "#616161"
    },
  },
  typography: {
    fontFamily: [
      'Bebas Neue',
      'sans-serif',
    ].join(','),
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    custom: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
  }
}

export default theme;