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
    warning:{
        main:"#f44336"
    },
    modalButtom:{
        main: "#979797",
        contrastText:"#242424"
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
    modalButtom: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    custom?: PaletteOptions['primary'];
    modalButtom?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    custom: true;
    modalButtom: true;
  }
}

export default theme;